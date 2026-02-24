import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
    sendBookingConfirmation,
    sendBookingCancellation,
    sendBookingReschedule,
    sendInternalNotification,
} from "@/lib/email/booking-emails";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const { triggerEvent, payload: data } = payload;

        if (triggerEvent === "BOOKING_CREATED") {
            // Upsert contact
            const { data: contact } = await supabase
                .from("contacts")
                .upsert(
                    {
                        email: data.attendees[0].email,
                        name: data.attendees[0].name,
                        source: "booking",
                        last_seen_at: new Date().toISOString(),
                    },
                    { onConflict: "email" }
                )
                .select()
                .single();

            // Insert booking
            await supabase.from("bookings").insert({
                cal_booking_id: String(data.bookingId),
                cal_event_type: data.eventTitle,
                attendee_name: data.attendees[0].name,
                attendee_email: data.attendees[0].email,
                attendee_timezone: data.attendees[0].timeZone,
                start_time: data.startTime,
                end_time: data.endTime,
                status: "confirmed",
            });

            // Log interaction
            if (contact) {
                await supabase.from("interactions").insert({
                    contact_id: contact.id,
                    type: "booking",
                    summary: `Booked: ${data.eventTitle}`,
                    metadata: { cal_booking_id: data.bookingId },
                });
            }

            // Send emails (don't fail webhook if email fails)
            const bookingData = {
                attendee_name: data.attendees[0].name,
                attendee_email: data.attendees[0].email,
                cal_event_type: data.eventTitle,
                start_time: data.startTime,
                end_time: data.endTime,
                attendee_timezone: data.attendees[0].timeZone,
            };
            try {
                await Promise.all([
                    sendBookingConfirmation(bookingData),
                    sendInternalNotification(bookingData),
                ]);
            } catch (emailErr) {
                console.error("Email send failed:", emailErr);
            }
        }

        if (triggerEvent === "BOOKING_CANCELLED") {
            await supabase
                .from("bookings")
                .update({ status: "cancelled" })
                .eq("cal_booking_id", String(data.bookingId));

            try {
                await sendBookingCancellation({
                    attendee_name: data.attendees[0].name,
                    attendee_email: data.attendees[0].email,
                    cal_event_type: data.eventTitle,
                    start_time: data.startTime,
                    end_time: data.endTime,
                });
            } catch (emailErr) {
                console.error("Cancellation email failed:", emailErr);
            }
        }

        if (triggerEvent === "BOOKING_RESCHEDULED") {
            await supabase
                .from("bookings")
                .update({
                    status: "rescheduled",
                    start_time: data.startTime,
                    end_time: data.endTime,
                    updated_at: new Date().toISOString(),
                })
                .eq("cal_booking_id", String(data.bookingId));

            try {
                await sendBookingReschedule({
                    attendee_name: data.attendees[0].name,
                    attendee_email: data.attendees[0].email,
                    cal_event_type: data.eventTitle,
                    start_time: data.startTime,
                    end_time: data.endTime,
                    attendee_timezone: data.attendees[0].timeZone,
                });
            } catch (emailErr) {
                console.error("Reschedule email failed:", emailErr);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
