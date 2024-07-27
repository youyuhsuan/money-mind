import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create the response object
    const userLogoutResponse = NextResponse.json({
      message: "The user was logged out!",
      success: true,
    });

    // Set the existing token to empty and expire it
    userLogoutResponse.cookies.set("session", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    });

    return userLogoutResponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
