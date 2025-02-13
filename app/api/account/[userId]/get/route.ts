import { NextRequest, NextResponse } from "next/server";
import { accountDB } from "@/libs/database";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session");
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedCookie = JSON.parse(atob(sessionCookie.value.split(".")[1]));
    const currentTime = Date.now();
    const expiryTime = decodedCookie.exp * 1000;
    if (currentTime > expiryTime) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }
    const transactionData = await accountDB.getTransactions(
      decodedCookie.user_id
    );
    if (!transactionData || transactionData.length === 0) {
      return NextResponse.json(
        { message: "No transactions found", transactions: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Transactions retrieved successfully",
        transactions: transactionData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
