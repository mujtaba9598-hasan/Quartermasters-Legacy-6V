"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function BookingClient() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: { branding: { brandColor: "#C15A2C" } },
                hideEventTypeDetails: false,
            });
        })();
    }, []);

    return (
        <div className="glass rounded-[2rem] p-4 md:p-8 border border-white/5 w-full min-h-[600px] h-[750px] relative overflow-hidden">
            <Cal
                calLink="quartermasters"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "dark" }}
            />
        </div>
    );
}
