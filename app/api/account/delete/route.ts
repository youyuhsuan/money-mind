import { NextRequest, NextResponse } from "next/server";
import { accountDB } from "@/libs/database";

export async function DELETE(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session");
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const sessionData = JSON.parse(sessionCookie.value);

    const url = new URL(request.url);
    const transactionId = url.searchParams.get("transactionId");
    if (!transactionId) {
      return NextResponse.json(
        { error: "Missing required transactionId" },
        { status: 400 }
      );
    }

    await accountDB.deleteTransaction(sessionData.userId, transactionId);
    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing transaction:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
