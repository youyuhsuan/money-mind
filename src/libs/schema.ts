import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const sessionSchema = z.object({
  idToken: z.string(),
  email: z.string().email("Invalid email format"),
  uid: z.string(),
});

const transactionSchema = z.object({
  id: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number"
    ),
  date: z.string().min(1, "Date is required"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  paymentMethod: z.enum(["cash", "credit"]),
  description: z.string().optional(),
});

export { authSchema, sessionSchema, transactionSchema };
