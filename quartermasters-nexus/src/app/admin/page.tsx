import { supabase } from "@/lib/supabase";
import { AdminDashboard } from "./AdminDashboard";

export const metadata = {
    title: "Admin Dashboard | Quartermasters",
};

export const revalidate = 0; // Dynamic data

export default async function AdminPage() {
    const [
        { data: bookings },
        { data: leads },
        { data: contacts },
        { data: interactions }
    ] = await Promise.all([
        supabase.from("bookings").select("*").order("start_time", { ascending: false }),
        supabase.from("lead_scores").select(`
      *,
      contact:contacts (name, email, company, source)
    `).order("score", { ascending: false }),
        supabase.from("contacts").select("*").order("first_seen_at", { ascending: false }),
        supabase.from("interactions").select("*").order("created_at", { ascending: false })
    ]);

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            <AdminDashboard
                initialBookings={bookings || []}
                initialLeads={leads || []}
                initialContacts={contacts || []}
                interactions={interactions || []}
            />
        </div>
    );
}
