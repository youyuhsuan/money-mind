import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sessionDB } from "@/libs/database";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.pathname.split("/").pop();

  try {
    const sessionCookie = request.cookies.get("session");
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionData = JSON.parse(sessionCookie.value);

    try {
      await sessionDB.deleteSession(sessionData.sessionId);
      cookies().delete("session");

      return NextResponse.redirect(new URL("/", request.url), {
        status: 302,
      });
    } catch (error) {
      console.error("Error deleting session:", error);
      return NextResponse.json(
        {
          error: "Session deletion failed",
          details: error instanceof Error ? error.message : "Unknown error",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Logout process failed:", error);

    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      {
        error: "Logout failed",
        details: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 }
    );
  }
}
