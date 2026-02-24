-- Create the 'projects' table for the Client Portal
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK (status IN ('discovery', 'active', 'review', 'completed', 'archived')) DEFAULT 'discovery',
    service_vertical TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Clients can only read their own projects
CREATE POLICY "Clients can view own projects" 
ON public.projects 
FOR SELECT 
TO authenticated 
USING (auth.uid() = client_id);

-- Only authenticated users (admins) or service roles can insert/update/delete.
-- For now, clients cannot insert their own projects directly (admins create them).
CREATE POLICY "Clients cannot insert or modify their own projects"
ON public.projects
FOR ALL
TO authenticated
USING (auth.uid() = client_id)
WITH CHECK (false);

-- Trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Create indices for performance
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
