import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("session")?.value;

  if (!user && request.nextUrl.pathname.startsWith("/accounting")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/accounting/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
