import { supabase } from "@/lib/supabase";

// Scoring rules (additive, max 100)
const SCORES = {
  HAS_EMAIL: 5,
  HAS_COMPANY: 10,
  HAS_PHONE: 5,
  CHAT_INTERACTION: 10,
  MULTIPLE_CHATS: 5,
  ASKED_PRICING: 10,
  ASKED_SERVICE: 10,
  BOOKED_CONSULTATION: 20,
  BOOKING_CONFIRMED: 5,
  BOOKING_COMPLETED: 10,
  FORM_SUBMISSION: 5,
  BUDGET_MENTIONED: 5,
} as const;

// Qualification thresholds
const THRESHOLDS: [number, string][] = [
  [81, "customer"],
  [56, "qualified"],
  [36, "hot"],
  [16, "warm"],
  [0, "cold"],
];

function getQualification(score: number): string {
  for (const [min, label] of THRESHOLDS) {
    if (score >= min) return label;
  }
  return "cold";
}

export async function calculateLeadScore(
  contactId: string
): Promise<{ score: number; qualification: string; breakdown: Record<string, number> }> {
  const breakdown: Record<string, number> = {};
  let score = 0;

  // Fetch contact
  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", contactId)
    .single();

  if (!contact) {
    return { score: 0, qualification: "cold", breakdown: {} };
  }

  // Contact data signals
  if (contact.email) {
    breakdown.has_email = SCORES.HAS_EMAIL;
    score += SCORES.HAS_EMAIL;
  }
  if (contact.company) {
    breakdown.has_company = SCORES.HAS_COMPANY;
    score += SCORES.HAS_COMPANY;
  }
  if (contact.phone) {
    breakdown.has_phone = SCORES.HAS_PHONE;
    score += SCORES.HAS_PHONE;
  }

  // Check metadata for budget
  const meta = contact.metadata as Record<string, unknown> | null;
  if (meta && (meta.budget || meta.budget_range)) {
    breakdown.budget_mentioned = SCORES.BUDGET_MENTIONED;
    score += SCORES.BUDGET_MENTIONED;
  }

  // Fetch interactions
  const { data: interactions } = await supabase
    .from("interactions")
    .select("type, summary, metadata")
    .eq("contact_id", contactId);

  if (interactions && interactions.length > 0) {
    const chatSessions = interactions.filter((i) => i.type === "chat");
    const formSubmits = interactions.filter((i) => i.type === "form_submit");

    if (chatSessions.length > 0) {
      breakdown.chat_interaction = SCORES.CHAT_INTERACTION;
      score += SCORES.CHAT_INTERACTION;
    }
    if (chatSessions.length > 2) {
      breakdown.multiple_chats = SCORES.MULTIPLE_CHATS;
      score += SCORES.MULTIPLE_CHATS;
    }
    if (formSubmits.length > 0) {
      breakdown.form_submission = SCORES.FORM_SUBMISSION;
      score += SCORES.FORM_SUBMISSION;
    }

    // Check interaction summaries for pricing/service keywords
    const allSummaries = interactions
      .map((i) => (i.summary || "").toLowerCase())
      .join(" ");

    if (allSummaries.includes("pric") || allSummaries.includes("cost") || allSummaries.includes("budget")) {
      breakdown.asked_pricing = SCORES.ASKED_PRICING;
      score += SCORES.ASKED_PRICING;
    }
    if (
      allSummaries.includes("hr") ||
      allSummaries.includes("consulting") ||
      allSummaries.includes("banking") ||
      allSummaries.includes("advisory") ||
      allSummaries.includes("it services") ||
      allSummaries.includes("software")
    ) {
      breakdown.asked_service = SCORES.ASKED_SERVICE;
      score += SCORES.ASKED_SERVICE;
    }
  }

  // Fetch bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("status")
    .eq("attendee_email", contact.email);

  if (bookings && bookings.length > 0) {
    breakdown.booked_consultation = SCORES.BOOKED_CONSULTATION;
    score += SCORES.BOOKED_CONSULTATION;

    const hasConfirmed = bookings.some((b) => b.status === "confirmed");
    const hasCompleted = bookings.some((b) => b.status === "completed");

    if (hasConfirmed) {
      breakdown.booking_confirmed = SCORES.BOOKING_CONFIRMED;
      score += SCORES.BOOKING_CONFIRMED;
    }
    if (hasCompleted) {
      breakdown.booking_completed = SCORES.BOOKING_COMPLETED;
      score += SCORES.BOOKING_COMPLETED;
    }
  }

  // Cap at 100
  score = Math.min(score, 100);
  const qualification = getQualification(score);

  return { score, qualification, breakdown };
}

export async function updateLeadScore(contactId: string): Promise<void> {
  const { score, qualification } = await calculateLeadScore(contactId);

  await supabase.from("lead_scores").upsert(
    {
      contact_id: contactId,
      score,
      qualification,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "contact_id" }
  );
}

export async function scoreAllContacts(): Promise<{ updated: number; errors: number }> {
  const { data: contacts } = await supabase.from("contacts").select("id");

  if (!contacts) return { updated: 0, errors: 0 };

  let updated = 0;
  let errors = 0;

  for (const contact of contacts) {
    try {
      await updateLeadScore(contact.id);
      updated++;
    } catch {
      errors++;
    }
  }

  return { updated, errors };
}
