import { supabase } from "@/lib/supabase";

export interface ClientMessage {
    id: string;
    client_id: string;
    project_id: string | null;
    sender_role: "client" | "team";
    sender_name: string;
    content: string;
    read_at: string | null;
    created_at: string;
}

export async function getMessages(
    clientId: string,
    projectId?: string,
    limit = 50
): Promise<ClientMessage[]> {
    let query = supabase
        .from("client_messages")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: true })
        .limit(limit);

    if (projectId) {
        query = query.eq("project_id", projectId);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as ClientMessage[];
}

export async function sendMessage(
    clientId: string,
    senderRole: "client" | "team",
    senderName: string,
    content: string,
    projectId?: string
): Promise<{ message?: ClientMessage; error?: string }> {
    if (!content.trim()) {
        return { error: "Message cannot be empty" };
    }

    const { data, error } = await supabase
        .from("client_messages")
        .insert({
            client_id: clientId,
            project_id: projectId || null,
            sender_role: senderRole,
            sender_name: senderName,
            content: content.trim(),
        })
        .select()
        .single();

    if (error) {
        return { error: error.message };
    }

    return { message: data as ClientMessage };
}

export async function markAsRead(clientId: string): Promise<void> {
    await supabase
        .from("client_messages")
        .update({ read_at: new Date().toISOString() })
        .eq("client_id", clientId)
        .eq("sender_role", "team")
        .is("read_at", null);
}

export async function getUnreadCount(clientId: string): Promise<number> {
    const { count, error } = await supabase
        .from("client_messages")
        .select("*", { count: "exact", head: true })
        .eq("client_id", clientId)
        .eq("sender_role", "team")
        .is("read_at", null);

    if (error || count === null) return 0;
    return count;
}

// Admin: send message as team to a client
export async function sendTeamMessage(
    clientId: string,
    senderName: string,
    content: string,
    projectId?: string
): Promise<{ message?: ClientMessage; error?: string }> {
    return sendMessage(clientId, "team", senderName, content, projectId);
}

// Admin: get all clients with unread messages
export async function getClientsWithUnread(): Promise<{ client_id: string; unread: number }[]> {
    const { data, error } = await supabase
        .from("client_messages")
        .select("client_id")
        .eq("sender_role", "client")
        .is("read_at", null);

    if (error || !data) return [];

    const counts: Record<string, number> = {};
    for (const row of data) {
        counts[row.client_id] = (counts[row.client_id] || 0) + 1;
    }

    return Object.entries(counts).map(([client_id, unread]) => ({ client_id, unread }));
}
