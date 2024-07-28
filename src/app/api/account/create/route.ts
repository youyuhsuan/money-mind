import { NextResponse } from "next/server";
import { accountDB } from "@/app/libs/db";
import { Timestamp } from "firebase/firestore";
import { getSessionData } from "@/app/utils/session";
import generateUniqueId from "@/app/utils/generateUniqueId";

interface AccountData {
  userId: string;
  transaction: TransactionData;
}

interface TransactionData {
  type: "income" | "expense";
  accountId: string;
  amount: number;
  description: string;
  createdAt: Timestamp;
}

export async function POST(request: Request) {
  try {
    const { type, amount, description } = await request.json();
    const sessionData = await getSessionData();

    if (!sessionData || !sessionData.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!type || !amount || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const transactionData: TransactionData = {
      type: type as "income" | "expense",
      accountId: await generateUniqueId(),
      amount: parsedAmount,
      description: description,
      createdAt: Timestamp.now(),
    };

    const accountData: AccountData = {
      userId: sessionData.userId,
      transaction: transactionData,
    };

    const { accountId, transactionId } =
      await accountDB.createAccountTransaction(
        sessionData.userId,
        accountData,
        transactionData
      );

    return NextResponse.json(
      {
        message: "Transaction added successfully",
        accountId: accountId,
        transactionId: transactionId,
      },
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
