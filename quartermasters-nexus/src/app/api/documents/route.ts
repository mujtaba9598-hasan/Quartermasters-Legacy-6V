import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getSignedUrl } from "@/lib/documents/document-service";

// GET /api/documents?clientId=xxx&projectId=yyy
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const projectId = searchParams.get("projectId");

    if (!clientId) {
        return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    let query = supabase
        .from("client_documents")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

    if (projectId) {
        query = query.eq("project_id", projectId);
    }

    const { data, error } = await query;
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ documents: data });
}

// POST /api/documents — upload a file
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const clientId = formData.get("clientId") as string | null;
        const projectId = formData.get("projectId") as string | null;
        const category = formData.get("category") as string | null;

        if (!file || !clientId) {
            return NextResponse.json({ error: "file and clientId are required" }, { status: 400 });
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return NextResponse.json({ error: "File too large. Maximum 10MB." }, { status: 413 });
        }

        // Upload to Supabase Storage
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const storagePath = `${clientId}/${timestamp}_${safeName}`;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
            .from("client-documents")
            .upload(storagePath, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
        }

        // Insert metadata
        const { data, error: dbError } = await supabase
            .from("client_documents")
            .insert({
                client_id: clientId,
                project_id: projectId || null,
                file_name: file.name,
                file_type: file.type,
                file_size: file.size,
                storage_path: storagePath,
                category: category || "general",
                uploaded_by: "client",
            })
            .select()
            .single();

        if (dbError) {
            await supabase.storage.from("client-documents").remove([storagePath]);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        return NextResponse.json({ document: data }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Upload processing failed" }, { status: 500 });
    }
}

// DELETE /api/documents?id=xxx&clientId=yyy
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clientId = searchParams.get("clientId");

    if (!id || !clientId) {
        return NextResponse.json({ error: "id and clientId are required" }, { status: 400 });
    }

    const { data: doc, error: fetchError } = await supabase
        .from("client_documents")
        .select("storage_path")
        .eq("id", id)
        .eq("client_id", clientId)
        .single();

    if (fetchError || !doc) {
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    await supabase.storage.from("client-documents").remove([doc.storage_path]);
    await supabase.from("client_documents").delete().eq("id", id);

    return NextResponse.json({ deleted: true });
}
