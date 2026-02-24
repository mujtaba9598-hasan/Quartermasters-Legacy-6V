import { NextRequest, NextResponse } from "next/server";
import { getMessages, sendMessage, markAsRead, getUnreadCount } from "@/lib/messages/message-service";

// GET /api/messages?clientId=xxx&projectId=yyy&limit=50
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");
    const projectId = searchParams.get("projectId") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    if (!clientId) {
        return NextResponse.json({ error: "clientId is required" }, { status: 400 });
    }

    const [messages, unread] = await Promise.all([
        getMessages(clientId, projectId, limit),
        getUnreadCount(clientId),
    ]);

    // Mark team messages as read when client fetches
    await markAsRead(clientId);

    return NextResponse.json({ messages, unread });
}

// POST /api/messages
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { clientId, senderRole, senderName, content, projectId } = body;

        if (!clientId || !senderRole || !senderName || !content) {
            return NextResponse.json(
                { error: "clientId, senderRole, senderName, and content are required" },
                { status: 400 }
            );
        }

        if (!["client", "team"].includes(senderRole)) {
            return NextResponse.json({ error: "senderRole must be 'client' or 'team'" }, { status: 400 });
        }

        const result = await sendMessage(clientId, senderRole, senderName, content, projectId);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ message: result.message }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
