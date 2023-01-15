import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware (request : NextRequest) {
    const session = request.cookies.get("next-auth.session-token")

    if(!session?.value) return NextResponse.redirect('http://localhost:3000')
}

export const config = {
    matcher : ["/profile/:path*", "/user/:path*", "/comment/:path*", "/friends/:path*", "/post/:path*"]
}