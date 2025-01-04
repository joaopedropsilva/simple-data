import { getAllTemplates, getAllTemplatesByUser } from "@/app/_lib/data/access";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const userId = params.get("user-id");

    let result;
    if (!userId) {
        result = await getAllTemplates();
    } else {
        result = await getAllTemplatesByUser(userId);
    }

    if (result.err != "") {
        return NextResponse.json({ error: result.err }, { status: 404 });
    }

    return NextResponse.json({ templates: result.payload });
}

