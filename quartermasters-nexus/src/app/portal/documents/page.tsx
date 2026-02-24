"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { formatFileSize } from "@/lib/documents/document-service";
import { motion, AnimatePresence } from "framer-motion";

interface DocRecord {
    id: string;
    file_name: string;
    file_type: string;
    file_size: number;
    storage_path: string;
    category: string;
    uploaded_by: string;
    created_at: string;
    project_id: string | null;
}

const CATEGORY_OPTIONS = ["general", "contract", "deliverable", "invoice", "brief", "report"];

function fileIcon(type: string) {
    if (type.includes("pdf")) return "PDF";
    if (type.includes("word") || type.includes("document")) return "DOC";
    if (type.includes("sheet") || type.includes("excel") || type.includes("csv")) return "XLS";
    if (type.includes("presentation") || type.includes("powerpoint")) return "PPT";
    if (type.includes("image")) return "IMG";
    return "FILE";
}

function iconColor(label: string) {
    const colors: Record<string, string> = {
        PDF: "bg-red-500/20 text-red-400",
        DOC: "bg-blue-500/20 text-blue-400",
        XLS: "bg-green-500/20 text-green-400",
        PPT: "bg-orange-500/20 text-orange-400",
        IMG: "bg-purple-500/20 text-purple-400",
        FILE: "bg-white/10 text-white/60",
    };
    return colors[label] || colors.FILE;
}

function DocumentsContent() {
    const { user } = useAuth();
    const [documents, setDocuments] = useState<DocRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [error, setError] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const fetchDocs = async () => {
        if (!user) return;
        const res = await fetch(`/api/documents?clientId=${user.id}`);
        const data = await res.json();
        setDocuments(data.documents || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchDocs();
    }, [user]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setUploading(true);
        setError(null);

        const form = new FormData();
        form.append("file", file);
        form.append("clientId", user.id);
        form.append("category", "general");

        const res = await fetch("/api/documents", { method: "POST", body: form });
        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Upload failed");
        } else {
            await fetchDocs();
        }

        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleDownload = async (doc: DocRecord) => {
        const res = await fetch(`/api/documents/download?path=${encodeURIComponent(doc.storage_path)}`);
        const data = await res.json();
        if (data.url) {
            window.open(data.url, "_blank");
        }
    };

    const handleDelete = async (doc: DocRecord) => {
        if (!user || !confirm(`Delete "${doc.file_name}"?`)) return;
        await fetch(`/api/documents?id=${doc.id}&clientId=${user.id}`, { method: "DELETE" });
        await fetchDocs();
    };

    const filtered = filter === "all" ? documents : documents.filter((d) => d.category === filter);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Documents</h1>
                    <p className="text-white/50 text-sm mt-1">
                        {documents.length} file{documents.length !== 1 ? "s" : ""} &middot; Secure storage
                    </p>
                </div>
                <div>
                    <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} />
                    <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="px-5 py-2.5 bg-[#C15A2C] hover:bg-[#C15A2C]/90 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
                    >
                        {uploading ? "Uploading..." : "Upload File"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
                {["all", ...CATEGORY_OPTIONS].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                            filter === cat
                                ? "bg-[#C15A2C] text-white"
                                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Document list */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-8 h-8 rounded-full border-4 border-[#C15A2C] border-t-transparent animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-white/40 text-lg">No documents yet</p>
                    <p className="text-white/25 text-sm mt-2">Upload your first file to get started</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {filtered.map((doc) => {
                            const icon = fileIcon(doc.file_type);
                            return (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="flex items-center gap-4 p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] transition-colors"
                                >
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${iconColor(icon)}`}>
                                        {icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{doc.file_name}</p>
                                        <p className="text-white/40 text-xs mt-0.5">
                                            {formatFileSize(doc.file_size)} &middot; {doc.category} &middot;{" "}
                                            {new Date(doc.created_at).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDownload(doc)}
                                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-xs transition-colors"
                                        >
                                            Download
                                        </button>
                                        {doc.uploaded_by === "client" && (
                                            <button
                                                onClick={() => handleDelete(doc)}
                                                className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 rounded-lg text-xs transition-colors"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default function DocumentsPage() {
    return (
        <ProtectedRoute>
            <DocumentsContent />
        </ProtectedRoute>
    );
}
