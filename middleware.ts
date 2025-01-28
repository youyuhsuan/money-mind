import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("session");
  if (request.nextUrl.pathname.startsWith("/accounting")) {
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decodedCookie = JSON.parse(atob(sessionCookie.value.split(".")[1]));
    const currentTime = Date.now();
    const expiryTime = decodedCookie.exp * 1000;
    if (currentTime > expiryTime) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("session");
      fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: decodedCookie.sessionId }), // 假設你的 JWT 中有存 sessionId
      }).catch(console.error);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
