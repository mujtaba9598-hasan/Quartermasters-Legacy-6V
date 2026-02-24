-- S6-03: Client Documents table + Supabase Storage bucket
-- Tracks file metadata; actual files live in Supabase Storage 'client-documents' bucket

CREATE TABLE IF NOT EXISTS client_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    uploaded_by TEXT NOT NULL DEFAULT 'client',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast client lookups
CREATE INDEX idx_client_documents_client_id ON client_documents(client_id);
CREATE INDEX idx_client_documents_project_id ON client_documents(project_id);

-- RLS: clients only see their own documents
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own documents"
    ON client_documents FOR SELECT
    USING (auth.uid() = client_id);

CREATE POLICY "Clients can upload own documents"
    ON client_documents FOR INSERT
    WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can delete own documents"
    ON client_documents FOR DELETE
    USING (auth.uid() = client_id);

-- Service role (admin) can do everything (bypasses RLS)
