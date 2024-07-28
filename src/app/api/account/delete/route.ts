import { NextResponse } from "next/server";
import { accountDB } from "@/app/libs/db";
import { getSessionData } from "@/app/utils/session";

export async function DELETE(request: Request) {
  try {
    const sessionData = await getSessionData();
    if (!sessionData || !sessionData.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
