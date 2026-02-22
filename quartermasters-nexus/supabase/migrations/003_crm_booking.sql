-- Bookings (synced from Cal.com webhooks)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cal_booking_id TEXT UNIQUE,
  cal_event_type TEXT,
  attendee_name TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  attendee_timezone TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'rescheduled', 'completed', 'no_show')),
  service_interest TEXT,
  notes TEXT,
  conversation_id UUID REFERENCES conversations(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CRM Contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  phone TEXT,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'booking', 'chat', 'referral', 'manual')),
  first_seen_at TIMESTAMPTZ DEFAULT now(),
  last_seen_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Interactions log
CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('chat', 'booking', 'email', 'call', 'form_submit', 'page_visit')),
  summary TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lead scores
CREATE TABLE IF NOT EXISTS lead_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID UNIQUE REFERENCES contacts(id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  qualification TEXT DEFAULT 'cold' CHECK (qualification IN ('cold', 'warm', 'hot', 'qualified', 'customer')),
  budget_range TEXT,
  service_interest TEXT,
  urgency TEXT DEFAULT 'low' CHECK (urgency IN ('low', 'medium', 'high', 'immediate')),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY service_role_bookings ON bookings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY service_role_contacts ON contacts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY service_role_interactions ON interactions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY service_role_lead_scores ON lead_scores FOR ALL USING (auth.role() = 'service_role');

-- Indexes
CREATE INDEX idx_bookings_email ON bookings(attendee_email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_start ON bookings(start_time);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_interactions_contact ON interactions(contact_id);
CREATE INDEX idx_lead_scores_score ON lead_scores(score DESC);
