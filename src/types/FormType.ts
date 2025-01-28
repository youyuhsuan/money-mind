import { Timestamp } from "firebase/firestore";

// Auth
type AuthFields = {
  email: string;
  password: string;
};

type AuthFormState = {
  fieldValues?: AuthFields;
  success?: string;
  error?: Partial<Record<keyof AuthFields, string>> | null;
  isLogin?: boolean;
};

// Transaction
type TransactionType = "income" | "expense";

interface TransactionFields {
  id?: string;
  type: "income" | "expense";
  amount: string;
  date: string;
  category: string[];
  paymentMethod: string;
  description: string;
}

interface TransactionState {
  success?: string;
  errors?: Partial<Record<keyof TransactionFields, string>> | null;
  fieldValues?: TransactionFields;
}

interface StoredTransactionData extends TransactionFields {
  userId: string;
  createdAt: Timestamp;
}

interface FormFieldsState {
  type: TransactionType;
  category: string[];
}

export type {
  AuthFields,
  AuthFormState,
  TransactionType,
  TransactionFields,
  TransactionState,
  StoredTransactionData,
  FormFieldsState,
};
