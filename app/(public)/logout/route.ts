import { deleteSession } from "@/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await deleteSession();

    return NextResponse.redirect(new URL("/auth", request.url));
}

