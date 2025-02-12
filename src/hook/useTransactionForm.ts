import React, { useRef, useState, useCallback } from "react";
import { useFormState } from "react-dom";
import { useToast } from "@chakra-ui/react";
import { transactionDispatch } from "@/libs/transactionDispatch";
import type { TransactionState } from "@/types/FormType";
import { TransactionType } from "@/types/ExpenseType";

const initialState: TransactionState = {
  success: "",
  errors: null,
  fieldValues: {
    type: "income",
    amount: "",
    date: "",
    category: [],
    paymentMethod: "",
    description: "",
  },
};
interface UseTransactionFormProps {
  onSuccess?: () => void;
}

interface UseTransactionFormReturn {
  state: TransactionState;
  dispatch: (formData: FormData) => void;
  formRef: React.RefObject<HTMLFormElement>;
  resetForm: () => void;
  category: string[];
  setCategory: (category: string[]) => void;
  type: TransactionType;
  setType: (type: TransactionType) => void;
}

export function useTransactionForm({
  onSuccess,
}: UseTransactionFormProps = {}): UseTransactionFormReturn {
  const toast = useToast();
  const [category, setCategory] = useState<string[]>([]);
  const [type, setType] = useState<TransactionType>("income");
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = useCallback(() => {
    formRef.current?.reset();
    setCategory([]);
    setType("income");
  }, []);

  const BoundDispatch = useCallback(
    async (_previousState: TransactionState, formData: FormData) => {
      try {
        const result = (await transactionDispatch(
          formData
        )) as TransactionState;

        if (result.success) {
          setTimeout(() => {
            toast({
              title: "Form submitted successfully",
              status: "success",
              duration: 3000,
            });
            resetForm();
            onSuccess?.();
          }, 0);
        }

        return result;
      } catch (error) {
        toast({
          title: "Error submitting form",
          status: "error",
          duration: 3000,
        });

        return {
          errors:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        } as TransactionState;
      }
    },
    [toast, resetForm, onSuccess]
  );

  const [state, dispatch] = useFormState(BoundDispatch, initialState);

  return {
    state,
    dispatch,
    formRef,
    resetForm,
    category,
    setCategory,
    type,
    setType,
  };
}
