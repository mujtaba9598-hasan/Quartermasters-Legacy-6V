-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    flow_type TEXT DEFAULT 'discovery',
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    email TEXT,
    company TEXT,
    budget_range TEXT,
    service_interest TEXT,
    qualification_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create pricing_states table
CREATE TABLE pricing_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    current_state TEXT NOT NULL CHECK (current_state IN ('initial', 'anchored', 'negotiating', 'floor', 'terminated', 'closed')),
    service TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('express', 'standard', 'premium', 'enterprise')),
    base_price INTEGER NOT NULL,
    current_price INTEGER NOT NULL,
    discount_applied INTEGER DEFAULT 0,
    nudge_triggered BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    service TEXT,
    doc_type TEXT DEFAULT 'knowledge',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create document_embeddings table
CREATE TABLE document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    chunk_text TEXT NOT NULL,
    embedding vector(1024),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create pricing_audit_log table
CREATE TABLE pricing_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create consent_records table
CREATE TABLE consent_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    geo_mode TEXT NOT NULL,
    necessary BOOLEAN DEFAULT true,
    analytics BOOLEAN DEFAULT false,
    marketing BOOLEAN DEFAULT false,
    do_not_sell BOOLEAN DEFAULT false,
    ip_country TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Indexes
CREATE INDEX idx_conversations_visitor_id ON conversations(visitor_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_document_embeddings_embedding ON document_embeddings USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_pricing_states_conversation_id ON pricing_states(conversation_id);
