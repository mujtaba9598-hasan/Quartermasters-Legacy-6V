-- S6-04: Client messaging — real-time chat between clients and QM team

CREATE TABLE IF NOT EXISTS client_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    sender_role TEXT NOT NULL CHECK (sender_role IN ('client', 'team')),
    sender_name TEXT NOT NULL,
    content TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_client_messages_client_id ON client_messages(client_id);
CREATE INDEX idx_client_messages_project_id ON client_messages(project_id);
CREATE INDEX idx_client_messages_created_at ON client_messages(created_at DESC);

-- RLS: clients only see their own messages
ALTER TABLE client_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own messages"
    ON client_messages FOR SELECT
    USING (auth.uid() = client_id);

CREATE POLICY "Clients can send messages"
    ON client_messages FOR INSERT
    WITH CHECK (auth.uid() = client_id AND sender_role = 'client');

-- Enable Supabase Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE client_messages;
