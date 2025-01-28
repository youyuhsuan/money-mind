import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase/firestore";
import { accountDB } from "@/libs/database";
import { transactionSchema } from "@/libs/schema";
import { StoredTransactionData } from "@/types/FormType";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { id, type, amount, date, category, paymentMethod, description } =
      transactionSchema.parse(body);

    const storedtransactionData: StoredTransactionData = {
      userId: decodedCookie.user_id,
      id,
      type,
      amount,
      date,
      category,
      paymentMethod,
      description,
      createdAt: Timestamp.now(),
    } as StoredTransactionData;
    const data = await accountDB.createAccountTransaction(
      storedtransactionData
    );
    return NextResponse.json(
      {
        accountId: data?.accountId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
