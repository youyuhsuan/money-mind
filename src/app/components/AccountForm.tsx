"use client";

import React, { useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  Form,
  Input,
  Label,
  Select,
  Button,
  ErrorMessage,
  SuccessMessage,
} from "@/app/components/style/Form.styled";
import { FormContainer } from "@/app/components/style/Container.styled";

interface AccountFormProps {
  refreshTransactions: () => void;
}

type FormState = {
  error: string | null;
  success: boolean;
  data: any | null;
};

const initialState: FormState = {
  error: null,
  success: false,
  data: null,
};

async function handleSubmit(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const type = formData.get("type") as string;
  const amount = formData.get("amount") as string;
  const description = formData.get("description") as string;
  try {
    const response = await fetch("/api/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, amount, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return { success: true, data, error: null };
  } catch (error) {
    console.error(`Account ${error}`);
    return {
      error: error instanceof Error ? error.message : "發生未知錯誤",
      success: false,
      data: null,
    };
  }
}

export function AccountForm({ refreshTransactions }: AccountFormProps) {
  const [state, formAction] = useFormState(handleSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      console.log("Refreshing transactions...");
      refreshTransactions();
    }
  }, [refreshTransactions, state]);

  return (
    <>
      <Form ref={formRef} action={formAction}>
        <FormContainer>
          <Label>Type</Label>
          <Select name="type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </FormContainer>
        <FormContainer>
          <Label>Amount</Label>
          <Input
            type="number"
            name="amount"
            placeholder="Please enter the amount..."
            required
          />
        </FormContainer>
        <FormContainer>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            placeholder="Please enter the description..."
            required
          />
        </FormContainer>
        <AccountButton />
        {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
        {state.success && <SuccessMessage>Submit Success!!</SuccessMessage>}
      </Form>
    </>
  );
}

function AccountButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting in..." : "Submit"}
    </Button>
  );
}
