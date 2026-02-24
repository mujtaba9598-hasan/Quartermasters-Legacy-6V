import { supabase } from "@/lib/supabase";

export async function signInWithEmail(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string, options?: any) {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: options,
        }
    });
}

export async function signInWithOAuth(provider: "google" | "github") {
    return await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        }
    });
}

export async function signOut() {
    return await supabase.auth.signOut();
}

export async function resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/update-password` : undefined,
    });
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
}

export async function getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
}
