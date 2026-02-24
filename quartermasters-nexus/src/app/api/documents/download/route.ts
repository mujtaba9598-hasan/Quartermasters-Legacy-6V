import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@/lib/documents/document-service";

// GET /api/documents/download?path=xxx&expires=3600
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const storagePath = searchParams.get("path");
    const expires = parseInt(searchParams.get("expires") || "3600", 10);

    if (!storagePath) {
        return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const signedUrl = await getSignedUrl(storagePath, expires);
    if (!signedUrl) {
        return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
    }

    return NextResponse.json({ url: signedUrl, expires_in: expires });
}
