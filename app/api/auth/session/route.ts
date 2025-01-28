import { NextRequest, NextResponse } from "next/server";

import { sessionDB } from "@/libs/database";
import { Timestamp } from "firebase/firestore";
import { sessionSchema } from "@/libs/schema";
import { FirebaseError } from "firebase/app";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken, email, uid } = sessionSchema.parse(body);

    const sessionData = {
      sessionId: idToken,
      userId: uid,
      userEmail: email,
      createdAt: Timestamp.now(),
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
    };

    await sessionDB.insertSession(sessionData);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "session",
      value: JSON.stringify(sessionData),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(
        "An unknown error occurred during Firebase login",
        error as Error
      );
      switch (error.code) {
        case "auth/invalid-credential":
          return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 400 }
          );
        case "auth/user-disabled":
          return NextResponse.json(
            { error: "This account has been disabled" },
            { status: 403 }
          );
        case "auth/user-not-found":
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        default:
          return NextResponse.json({ error: "Login failed" }, { status: 500 });
      }
    }
    throw new Error("Unknown error during login API", error as Error);
  }
}

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("session");
  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value);
    const session = await sessionDB.findSession(sessionData.sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error processing get session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
