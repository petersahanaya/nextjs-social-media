import { NextMiddleware, NextRequest, NextResponse } from "next/server";

const middleware : NextMiddleware = async (req : NextRequest) => {
    const token = req.cookies.get("__Secure-next-auth.session-token")?.value

    if(!token) {
      return NextResponse.redirect(new URL("https://p3social.vercel.app"))
    }

    return NextResponse.next()
}

export default middleware

export const config = {
  matcher: [
    "/profile/:path*",
    "/user/:path*",
    "/comment/:path*",
    "/friends/:path*",
    "/post/:path*",
  ],
};
