"use client";

import { useState } from "react";
import { signInWithEmail, signInWithOAuth } from "@/lib/auth/supabase-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await signInWithEmail(email, password);
        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/portal");
        }
    };

    const handleOAuth = async (provider: "google" | "github") => {
        const { error } = await signInWithOAuth(provider);
        if (error) setError(error.message);
    };

    return (
        <div className="min-h-screen bg-[#002147] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C15A2C]/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-white/60">Log into the Quartermasters Client Portal</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C15A2C] transition-colors"
                            placeholder="you@company.com"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-sm font-medium text-white/80">Password</label>
                            <Link href="/auth/reset-password" className="text-sm text-[#C15A2C] hover:text-[#C15A2C]/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C15A2C] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#C15A2C] hover:bg-[#C15A2C]/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-white/40 bg-[#002147]">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleOAuth("google")}
                            className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white"
                        >
                            Google
                        </button>
                        <button
                            onClick={() => handleOAuth("github")}
                            className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white"
                        >
                            GitHub
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-white/60">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="text-[#C15A2C] hover:text-[#C15A2C]/80 font-medium">
                        Request Access
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
