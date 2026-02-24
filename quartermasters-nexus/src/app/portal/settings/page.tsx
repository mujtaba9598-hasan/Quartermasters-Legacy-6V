"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Save, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const [profile, setProfile] = useState({
        name: "",
        company: "",
        phone: "",
    });

    const [password, setPassword] = useState({
        new: "",
        confirm: "",
    });

    const [notifications, setNotifications] = useState({
        projectUpdates: true,
        marketing: false,
    });

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('contacts')
                .select('name, company, phone')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile({
                    name: data.name || "",
                    company: data.company || "",
                    phone: data.phone || "",
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: "", type: "" });

        try {
            // Update CRM Contact
            const { error: crmError } = await supabase
                .from('contacts')
                .update({
                    name: profile.name,
                    company: profile.company,
                    phone: profile.phone
                })
                .eq('id', user?.id);

            if (crmError) throw crmError;

            // Sync name to Auth user metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: { full_name: profile.name }
            });

            if (authError) throw authError;

            setMessage({ text: "Profile updated successfully.", type: "success" });
        } catch (error: any) {
            setMessage({ text: error.message, type: "error" });
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.new !== password.confirm) {
            setMessage({ text: "Passwords do not match.", type: "error" });
            return;
        }

        if (password.new.length < 8) {
            setMessage({ text: "Password must be at least 8 characters.", type: "error" });
            return;
        }

        setSaving(true);
        setMessage({ text: "", type: "" });

        try {
            const { error } = await supabase.auth.updateUser({
                password: password.new
            });

            if (error) throw error;

            setMessage({ text: "Password updated successfully.", type: "success" });
            setPassword({ new: "", confirm: "" });
        } catch (error: any) {
            setMessage({ text: error.message, type: "error" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="w-8 h-8 rounded-full border-4 border-[#C15A2C] border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-heading">Settings</h1>
                <p className="text-white/60">Manage your account preferences and secure your portal.</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl border text-sm ${message.type === 'error'
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-green-500/10 border-green-500/20 text-green-400'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation/TOC (Optional desktop layout sidebar) */}
                <div className="hidden md:block space-y-2">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-medium">Profile</div>
                    <div className="px-4 py-2 text-white/50 hover:text-white transition-colors cursor-pointer">Security</div>
                    <div className="px-4 py-2 text-white/50 hover:text-white transition-colors cursor-pointer">Notifications</div>
                </div>

                <div className="md:col-span-2 space-y-8">
                    {/* Profile Section */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="p-2 bg-[#C15A2C]/20 rounded-lg"><Save className="w-4 h-4 text-[#C15A2C]" /></span>
                            Personal Information
                        </h2>
                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={profile.name}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C15A2C] transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Company</label>
                                    <input
                                        type="text"
                                        value={profile.company}
                                        onChange={e => setProfile({ ...profile, company: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C15A2C] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C15A2C] transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2.5 bg-[#C15A2C] hover:bg-[#C15A2C]/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="p-2 bg-blue-500/20 rounded-lg"><Lock className="w-4 h-4 text-blue-400" /></span>
                            Security
                        </h2>
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={password.new}
                                    onChange={e => setPassword({ ...password, new: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={password.confirm}
                                    onChange={e => setPassword({ ...password, confirm: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={saving || !password.new}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Notifications Section */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="p-2 bg-yellow-500/20 rounded-lg"><Bell className="w-4 h-4 text-yellow-400" /></span>
                            Email Notifications
                        </h2>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                                <div>
                                    <p className="text-white font-medium">Project Updates</p>
                                    <p className="text-sm text-white/50">Receive emails when your project status changes.</p>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${notifications.projectUpdates ? 'bg-green-500' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.projectUpdates ? 'left-7' : 'left-1'}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={notifications.projectUpdates}
                                    onChange={() => setNotifications({ ...notifications, projectUpdates: !notifications.projectUpdates })}
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                                <div>
                                    <p className="text-white font-medium">Quartermasters Intel</p>
                                    <p className="text-sm text-white/50">Marketing emails, newsletters, and security alerts.</p>
                                </div>
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${notifications.marketing ? 'bg-green-500' : 'bg-white/10'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.marketing ? 'left-7' : 'left-1'}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={notifications.marketing}
                                    onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
