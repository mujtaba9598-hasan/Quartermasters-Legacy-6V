import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { compileClientReportData, sendWeeklyReport } from "@/lib/reports/weekly-digest";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const specificClientId = searchParams.get("clientId");

        // We must use the service role to list auth users
        if (!supabase) {
            return NextResponse.json({ error: "Supabase service role not configured" }, { status: 500 });
        }

        const { data: { users }, error } = await supabase.auth.admin.listUsers();
        if (error) throw error;

        let targetUsers = users;

        if (specificClientId) {
            targetUsers = users.filter((u) => u.id === specificClientId);
            if (targetUsers.length === 0) {
                return NextResponse.json({ error: "Specific client not found" }, { status: 404 });
            }
        }

        // Filter out opted-out users
        targetUsers = targetUsers.filter((u) => {
            const meta = u.user_metadata || {};
            return meta.report_opt_out !== true;
        });

        const weekEnd = new Date();
        const weekStart = new Date();
        weekStart.setDate(weekEnd.getDate() - 7);

        let sentCount = 0;
        const errors: any[] = [];

        for (const user of targetUsers) {
            try {
                const reportData = await compileClientReportData(user, weekStart, weekEnd);

                if (reportData) {
                    await sendWeeklyReport(reportData);
                    sentCount++;
                }
            } catch (err: any) {
                console.error(`Error sending report to ${user.email}:`, err);
                errors.push({ email: user.email, error: err.message });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Weekly intelligence reports dispatched.`,
            stats: {
                attempted: targetUsers.length,
                sent: sentCount,
                errors: errors.length
            },
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error: any) {
        console.error("Weekly report API error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
