export const metadata = {
    title: "Schedule a Consultation | Quartermasters",
    description: "Select the session type that fits your needs. All times shown in your local timezone.",
};

import { BookingClient } from "./BookingClient";

export default function BookingPage() {
    return (
        <div className="relative min-h-screen pt-24 pb-20">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-[#002147]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#002147] to-slate-950 opacity-80" />

            {/* Hero content & embed container */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center md:max-w-2xl mx-auto mb-16">
                        <h1 className="heading-2 mb-6 text-white text-5xl md:text-6xl font-bold font-heading">
                            Schedule a <span style={{ color: "#C15A2C" }}>Consultation</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                            Select the session type that fits your needs. All times shown in your local timezone.
                        </p>
                    </div>

                    <BookingClient />
                </div>
            </section>
        </div>
    );
}
