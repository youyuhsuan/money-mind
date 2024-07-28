import { NextResponse } from "next/server";
import { accountDB } from "@/app/libs/db";
import { getSessionData } from "@/app/utils/session";

export async function GET(request: Request) {
  try {
    const sessionData = await getSessionData();
    if (!sessionData || !sessionData.userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
    const transactionData = await accountDB.getTransactions(sessionData.userId);
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
