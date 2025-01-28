import { v4 as uuidv4 } from "uuid";
import { transactionSchema } from "@/libs/schema";

// react form input get valid
export async function validateTransactionInput(formData: FormData) {
  const id = uuidv4();
  let type = formData.get("type");
  type = type ? JSON.parse(type as string) : [];
  const amount = formData.get("amount");
  let category = formData.get("category");
  category = category ? JSON.parse(category as string) : [];
  const date = formData.get("date");
  const paymentMethod = formData.get("paymentMethod");
  const description = formData.get("description");

  return transactionSchema.safeParse({
    id,
    type,
    amount,
    date,
    category,
    paymentMethod,
    description,
  });
}

export async function transactionDispatch(formData: FormData) {
  const validatedFields = await validateTransactionInput(formData);
  if (!validatedFields.success) {
    const formattedErrors = validatedFields.error.issues.reduce(
      (acc, issue) => ({
        ...acc,
        [issue.path[0]]: issue.message,
      }),
      {}
    );
    return { errors: formattedErrors };
  }
  const transaction = validatedFields.data;
  try {
    const response = await fetch("/api/account/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }
    const data = await response.json();

    return { data: data, success: "Form submitted successfully" };
  } catch (error) {
    console.error("An unexpected error occurred.");
    return error;
  }
}
