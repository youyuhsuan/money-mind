import { TransactionFields } from "@/types/FormType";

export const initialState = {
  expenses: [] as any[],
  initialState: {
    id: "",
    type: "income",
    amount: "",
    date: "",
    category: [],
    paymentMethod: "",
    description: "",
  } as TransactionFields,
};
