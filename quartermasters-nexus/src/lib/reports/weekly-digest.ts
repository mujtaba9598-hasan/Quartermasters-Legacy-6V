import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = "Quartermasters <hello@quartermasters.me>";
const PORTAL_URL = "https://quartermasters.me/portal";

export interface WeeklyReportData {
    clientId: string;
    clientName: string;
    clientEmail: string;
    activeProjects: number;
    newDocumentsCount: number;
    messagesExchanged: number;
    upcomingBookingsCount: number;
    currentLeadScore: number;
    weekStart: Date;
    weekEnd: Date;
}

function emailWrapper(title: string, body: string): string {
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;">
        <tr><td style="height:4px;background:#C15A2C;"></td></tr>
        <tr><td style="padding:32px 40px 8px;">
          <h2 style="margin:0;color:#C15A2C;font-size:14px;text-transform:uppercase;letter-spacing:2px;">Quartermasters</h2>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <h1 style="margin:0 0 24px;color:#f0f0f0;font-size:22px;">${title}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1f2937;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Quartermasters &mdash; Management &amp; Technology Consultancy</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function generateReportHtml(data: WeeklyReportData): string {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const weekRange = `${data.weekStart.toLocaleDateString('en-US', dateOptions)} - ${data.weekEnd.toLocaleDateString('en-US', dateOptions)}`;

    const body = `
    <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin-bottom:24px;">
      Hi ${data.clientName},
    </p>
    <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin-bottom:32px;">
      Here is your weekly intelligence and progress summary for the period of <strong>${weekRange}</strong>.
    </p>
    
    <table style="width:100%;margin:20px 0;border-collapse:collapse;" cellpadding="12" cellspacing="0">
      <tr>
        <td style="border-bottom:1px solid #1f2937;color:#9ca3af;width:50%;">Active Projects</td>
        <td style="border-bottom:1px solid #1f2937;color:#f0f0f0;font-weight:600;text-align:right;">${data.activeProjects}</td>
      </tr>
      <tr>
        <td style="border-bottom:1px solid #1f2937;color:#9ca3af;">New Documents Shared</td>
        <td style="border-bottom:1px solid #1f2937;color:#f0f0f0;font-weight:600;text-align:right;">${data.newDocumentsCount}</td>
      </tr>
      <tr>
        <td style="border-bottom:1px solid #1f2937;color:#9ca3af;">Messages Exchanged</td>
        <td style="border-bottom:1px solid #1f2937;color:#f0f0f0;font-weight:600;text-align:right;">${data.messagesExchanged}</td>
      </tr>
      <tr>
        <td style="border-bottom:1px solid #1f2937;color:#9ca3af;">Upcoming Meetings</td>
        <td style="border-bottom:1px solid #1f2937;color:#f0f0f0;font-weight:600;text-align:right;">${data.upcomingBookingsCount}</td>
      </tr>
      <tr>
        <td style="border-bottom:1px solid #1f2937;color:#9ca3af;">Engagement Score</td>
        <td style="border-bottom:1px solid #1f2937;color:#C15A2C;font-weight:600;text-align:right;">${data.currentLeadScore} / 100</td>
      </tr>
    </table>
    
    <p style="margin:40px 0 20px;">
      <a href="${PORTAL_URL}" style="display:inline-block;padding:14px 32px;background:#C15A2C;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;letter-spacing:1px;">ACCESS PORTAL</a>
    </p>
  `;

    return emailWrapper("Weekly Intelligence Update", body);
}

export async function compileClientReportData(clientUser: any, weekStart: Date, weekEnd: Date): Promise<WeeklyReportData | null> {
    const weekStartISO = weekStart.toISOString();

    // 1. Projects
    const { data: projects } = await supabase
        .from('projects')
        .select('id, status')
        .eq('client_id', clientUser.id)
        .not('status', 'in', '("archived","completed")');

    const activeProjects = projects ? projects.length : 0;

    // 2. Documents created this week
    const { data: documents } = await supabase
        .from('client_documents')
        .select('id')
        .eq('client_id', clientUser.id)
        .gte('created_at', weekStartISO);

    const newDocumentsCount = documents ? documents.length : 0;

    // 3. Messages exchanged this week
    const { data: messages } = await supabase
        .from('client_messages')
        .select('id')
        .eq('client_id', clientUser.id)
        .gte('created_at', weekStartISO);

    const messagesExchanged = messages ? messages.length : 0;

    // 4. Upcoming bookings
    const { data: bookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('attendee_email', clientUser.email)
        .gte('start_time', weekEnd.toISOString()); // Upcoming from today

    const upcomingBookingsCount = bookings ? bookings.length : 0;

    // 5. Engagement Score
    const { data: leadScore } = await supabase
        .from('lead_scores')
        .select('score')
        .eq('contact_id', clientUser.id)
        .single();

    const currentLeadScore = leadScore?.score || 0;

    // Only send if there's an active project, upcoming booking, or recent activity
    const hasActivity = activeProjects > 0 || upcomingBookingsCount > 0 || newDocumentsCount > 0 || messagesExchanged > 0;
    if (!hasActivity) {
        return null; // Skip this client
    }

    const clientName = clientUser.user_metadata?.full_name?.split(' ')[0] || "Client";

    return {
        clientId: clientUser.id,
        clientName,
        clientEmail: clientUser.email,
        activeProjects,
        newDocumentsCount,
        messagesExchanged,
        upcomingBookingsCount,
        currentLeadScore,
        weekStart,
        weekEnd,
    };
}

export async function sendWeeklyReport(report: WeeklyReportData) {
    const html = generateReportHtml(report);

    // Send email via Resend
    await resend.emails.send({
        from: FROM_ADDRESS,
        to: report.clientEmail,
        subject: "Your Quartermasters Weekly Intelligence Update",
        html,
    });

    // Log in CRM interactions
    await supabase.from('interactions').insert({
        contact_id: report.clientId, // Since contact_id is often matching auth.user ids per our setup
        type: 'weekly_report',
        summary: 'Sent automated weekly progress report.',
        metadata: {
            active_projects: report.activeProjects,
            score: report.currentLeadScore
        }
    });

    return true;
}
