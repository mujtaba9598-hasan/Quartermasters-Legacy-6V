-- S7-01: Payments and Invoices table
-- Tracks Stripe checkout sessions and payment intents

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')) NOT NULL,
    service TEXT,
    tier TEXT,
    line_items JSONB,
    tax_amount NUMERIC DEFAULT 0,
    total_amount NUMERIC NOT NULL,
    issued_at TIMESTAMPTZ,
    due_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    stripe_payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    stripe_session_id TEXT NOT NULL,
    stripe_payment_intent_id TEXT,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    status TEXT CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')) NOT NULL,
    service TEXT,
    tier TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_payments_client_id ON payments(client_id);
CREATE INDEX idx_payments_stripe_session_id ON payments(stripe_session_id);

-- RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own invoices"
    ON invoices FOR SELECT
    USING (auth.uid() = client_id);

CREATE POLICY "Clients can view own payments"
    ON payments FOR SELECT
    USING (auth.uid() = client_id);

-- Trigger to automatically update updated_at on invoices
CREATE TRIGGER update_invoices_modtime
BEFORE UPDATE ON invoices
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
