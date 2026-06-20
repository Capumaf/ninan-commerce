import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnOs = req.nextUrl.pathname.startsWith("/os");

  if (isOnOs && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/os/:path*"],
};