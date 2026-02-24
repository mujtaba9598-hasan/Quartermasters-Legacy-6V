export type NotificationPayload = {
    title: string;
    body: string;
    icon?: string;
    url?: string;
    tag?: string;
};

export const NOTIFICATION_TEMPLATES = {
    BOOKING_CONFIRMED: (date: string): NotificationPayload => ({
        title: 'Booking Confirmed',
        body: `Your consultation is scheduled for ${date}.`,
        icon: '/quartermasters-logo-monogram.png',
        url: '/portal',
        tag: 'booking-update'
    }),

    BOOKING_REMINDER_24H: (service: string, time: string): NotificationPayload => ({
        title: 'Reminder: Consultation Tomorrow',
        body: `Your ${service} consultation is at ${time}.`,
        icon: '/quartermasters-logo-monogram.png',
        url: '/portal',
        tag: 'booking-reminder'
    }),

    BOOKING_REMINDER_1H: (): NotificationPayload => ({
        title: 'Starting Soon',
        body: 'Your consultation begins in 1 hour.',
        icon: '/quartermasters-logo-monogram.png',
        url: '/portal',
        tag: 'booking-reminder'
    }),

    NEW_LEAD_ALERT: (name: string, company: string | undefined, service: string): NotificationPayload => ({
        title: 'New Lead Alert',
        body: `${name}${company ? ` from ${company}` : ''} initiated checkout for ${service}.`,
        icon: '/quartermasters-logo-monogram.png',
        url: '/admin',
        tag: 'admin-alert'
    }),

    CHECKOUT_COMPLETE: (name: string, tier: string, service: string, amount: number | string): NotificationPayload => ({
        title: 'Payment Received',
        body: `${name} purchased ${tier} ${service} — $${amount}.`,
        icon: '/quartermasters-logo-monogram.png',
        url: '/admin',
        tag: 'admin-alert'
    })
};
