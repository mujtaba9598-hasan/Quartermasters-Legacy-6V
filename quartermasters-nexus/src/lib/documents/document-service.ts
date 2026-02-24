import { supabase } from "@/lib/supabase";

const BUCKET = "client-documents";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/png",
    "image/jpeg",
    "image/webp",
    "text/plain",
    "text/csv",
];

export interface DocumentRecord {
    id: string;
    client_id: string;
    project_id: string | null;
    file_name: string;
    file_type: string;
    file_size: number;
    storage_path: string;
    category: string;
    uploaded_by: string;
    created_at: string;
    updated_at: string;
}

export interface UploadResult {
    success: boolean;
    document?: DocumentRecord;
    error?: string;
}

function validateFile(file: { name: string; type: string; size: number }): string | null {
    if (file.size > MAX_FILE_SIZE) {
        return `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
        return "File type not allowed. Accepted: PDF, Word, Excel, PowerPoint, images, CSV, text.";
    }
    return null;
}

export async function uploadDocument(
    clientId: string,
    file: File,
    options?: { projectId?: string; category?: string }
): Promise<UploadResult> {
    const validationError = validateFile(file);
    if (validationError) {
        return { success: false, error: validationError };
    }

    // Build storage path: client_id/timestamp_filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${clientId}/${timestamp}_${safeName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, file, {
            contentType: file.type,
            upsert: false,
        });

    if (uploadError) {
        return { success: false, error: `Upload failed: ${uploadError.message}` };
    }

    // Insert metadata record
    const { data, error: dbError } = await supabase
        .from("client_documents")
        .insert({
            client_id: clientId,
            project_id: options?.projectId || null,
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            storage_path: storagePath,
            category: options?.category || "general",
            uploaded_by: "client",
        })
        .select()
        .single();

    if (dbError) {
        // Rollback: delete uploaded file
        await supabase.storage.from(BUCKET).remove([storagePath]);
        return { success: false, error: `Failed to save document record: ${dbError.message}` };
    }

    return { success: true, document: data as DocumentRecord };
}

export async function getSignedUrl(storagePath: string, expiresIn = 3600): Promise<string | null> {
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(storagePath, expiresIn);

    if (error || !data?.signedUrl) return null;
    return data.signedUrl;
}

export async function getClientDocuments(clientId: string, projectId?: string): Promise<DocumentRecord[]> {
    let query = supabase
        .from("client_documents")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

    if (projectId) {
        query = query.eq("project_id", projectId);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as DocumentRecord[];
}

export async function deleteDocument(documentId: string, clientId: string): Promise<{ success: boolean; error?: string }> {
    // Fetch the record first to get storage path
    const { data: doc, error: fetchError } = await supabase
        .from("client_documents")
        .select("storage_path")
        .eq("id", documentId)
        .eq("client_id", clientId)
        .single();

    if (fetchError || !doc) {
        return { success: false, error: "Document not found." };
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove([doc.storage_path]);

    if (storageError) {
        return { success: false, error: `Storage delete failed: ${storageError.message}` };
    }

    // Delete metadata record
    const { error: dbError } = await supabase
        .from("client_documents")
        .delete()
        .eq("id", documentId)
        .eq("client_id", clientId);

    if (dbError) {
        return { success: false, error: `Record delete failed: ${dbError.message}` };
    }

    return { success: true };
}

export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
