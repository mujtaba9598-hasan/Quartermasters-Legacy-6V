'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageCard } from '@/components/checkout/PackageCard';
import { StripeProvider } from '@/components/checkout/StripeProvider';
import { SupportedCurrency, getSupportedCurrencies } from '@/lib/pricing/currency';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CheckoutClientProps {
    service: string;
    tier: string;
}

const steps = ["Summary", "Details", "Payment"];

export function CheckoutClient({ service, tier }: CheckoutClientProps) {
    const [step, setStep] = useState(1);
    const [currency, setCurrency] = useState<SupportedCurrency>("USD");
    const [isProcessing, setIsProcessing] = useState(false);

    // Contact State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");

    // Payment State
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    // Initial query check for successful redirect from Stripe Elements
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectStatus = urlParams.get('redirect_status');
            if (redirectStatus === 'succeeded') {
                setStep(4);
            }
        }
    }, []);

    const handleContinueToPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) return;

        setIsProcessing(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service, tier, currency, name, email, company, phone }),
            });
            const data = await res.json();
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setStep(3);
            } else {
                alert(data.error || 'Failed to initialize checkout');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left Column: Summary */}
            <div className="order-2 lg:order-1 flex flex-col pt-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-heading text-white">Order Summary</h2>
                    {step === 1 && (
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                            className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#C15A2C]"
                        >
                            {getSupportedCurrencies().map(c => (
                                <option key={c} value={c} className="bg-slate-900">{c}</option>
                            ))}
                        </select>
                    )}
                </div>

                <PackageCard service={service} tier={tier} currency={currency} />
            </div>

            {/* Right Column: Interaction Form */}
            <div className="order-1 lg:order-2">

                {/* Progress Indicators */}
                {step < 4 && (
                    <div className="flex items-center gap-2 mb-10 pt-8">
                        {steps.map((s, i) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step >= i + 1 ? 'bg-[#C15A2C] text-white' : 'bg-white/10 text-slate-400'}`}>
                                    {i + 1}
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-[1px] w-8 ${step > i + 1 ? 'bg-[#C15A2C]' : 'bg-white/10'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: Introduction */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-full justify-center"
                            >
                                <h2 className="text-3xl font-heading text-white mb-4">Express Checkout</h2>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    You are initiating a direct, self-service purchase of the {tier.toUpperCase()} package. This expedited path requires zero human negotiation and commences delivery timelines immediately upon payment confirmation.
                                </p>
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full bg-[#C15A2C] hover:bg-[#a64a21] text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                >
                                    Provide Contact Details
                                    <span>&rarr;</span>
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 2: Contact Info */}
                        {step === 2 && (
                            <motion.form
                                key="step2"
                                onSubmit={handleContinueToPayment}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col space-y-5"
                            >
                                <div>
                                    <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Legal Name</label>
                                    <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C15A2C] transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Work Email</label>
                                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C15A2C] transition-colors" placeholder="john@example.com" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Company <span className="text-slate-600">(Opt)</span></label>
                                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C15A2C] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Phone <span className="text-slate-600">(Opt)</span></label>
                                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C15A2C] transition-colors" />
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                                        Back
                                    </button>
                                    <button disabled={isProcessing} type="submit" className="flex-1 bg-[#C15A2C] hover:bg-[#a64a21] disabled:opacity-50 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors">
                                        {isProcessing ? 'Securing...' : 'Proceed to Setup'}
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {/* STEP 3: Payment (Stripe) */}
                        {step === 3 && clientSecret && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full h-full"
                            >
                                <StripeProvider clientSecret={clientSecret}>
                                    <StripePaymentForm onBack={() => setStep(2)} />
                                </StripeProvider>
                            </motion.div>
                        )}

                        {/* STEP 4: Success */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col h-full justify-center items-center text-center py-10"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-heading text-white mb-4">Payment Cleared</h2>
                                <p className="text-slate-400 mb-8 max-w-sm">
                                    Your {tier.toUpperCase()} package is officially secured. We have dispatched your digital invoice and onboarding instructions.
                                </p>
                                <a href="/portal" className="inline-block bg-[#C15A2C] hover:bg-[#a64a21] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-colors">
                                    Enter Client Portal
                                </a>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function StripePaymentForm({ onBack }: { onBack: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsSubmitting(true);
        setErrorMsg(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // Redirects back here with query params
            }
        });

        if (error) {
            setErrorMsg(error.message || "An unexpected error occurred.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full min-h-[400px]">
            <div className="flex-1">
                <PaymentElement />
                {errorMsg && <div className="text-red-400 text-sm mt-4 p-3 bg-red-400/10 rounded-lg">{errorMsg}</div>}
            </div>
            <div className="pt-8 flex gap-4 mt-auto">
                <button type="button" onClick={onBack} disabled={isSubmitting} className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                    Back
                </button>
                <button type="submit" disabled={!stripe || isSubmitting} className="flex-1 bg-[#C15A2C] hover:bg-[#a64a21] disabled:opacity-50 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors flex justify-center items-center">
                    {isSubmitting ? 'Processing...' : 'Secure Authorization'}
                </button>
            </div>
        </form>
    );
}
