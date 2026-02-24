-- ==========================================
-- S9-03: A/B Testing Framework Schema
-- ==========================================

-- Table to define active experiments
CREATE TABLE IF NOT EXISTS public.ab_experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experiment_key TEXT UNIQUE NOT NULL, -- e.g. "q-greeting"
    name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'completed')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Table to log experiment events (impressions, clicks, conversions)
CREATE TABLE IF NOT EXISTS public.ab_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experiment_id TEXT NOT NULL, -- using the key for easier querying natively without joins
    variant_id TEXT NOT NULL,
    visitor_id UUID NOT NULL, -- The cookie-based qm_visitor_id
    metric TEXT NOT NULL CHECK (metric IN ('impression', 'click', 'conversion', 'bounce')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for fast querying
CREATE INDEX idx_ab_events_experiment_variant ON public.ab_events(experiment_id, variant_id);
CREATE INDEX idx_ab_events_visitor ON public.ab_events(visitor_id);

-- Enable RLS
ALTER TABLE public.ab_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_events ENABLE ROW LEVEL SECURITY;

-- Policies for ab_events
-- Allow anon client to insert (for browser-side tracking)
CREATE POLICY "Allow anonymous A/B event inserts"
    ON public.ab_events
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only service role can read events
CREATE POLICY "Service role manages A/B events"
    ON public.ab_events
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policies for ab_experiments
-- Anyone can read active experiments (useful for edge config if needed later)
CREATE POLICY "Anyone can read active experiments"
    ON public.ab_experiments
    FOR SELECT
    TO anon, authenticated
    USING (status = 'active');

CREATE POLICY "Service role manages A/B experiments"
    ON public.ab_experiments
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
