"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate, AuthFormState } from "@/app/libs/actions";
import {
  Form,
  Input,
  Button,
  ErrorMessage,
} from "@/app/components/style/Form.styled";
import { FormContainer } from "@/app/components/style/Container.styled";

const initialState: AuthFormState = {
  message: "",
  errors: undefined,
  fieldValues: {
    email: "",
    password: "",
  },
};

export default function SignUpForm() {
  const [authFormState, formAction] = useFormState(authenticate, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  // console.log("SignUpForm state:", authFormState);

  useEffect(() => {
    if (authFormState.message === "signup successful") {
      formRef.current?.reset();
      // 可以在這裡添加註冊成功後的處理邏輯，比如重定向或顯示成功消息
    }
  }, [authFormState]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.set("action", "signup");
      formAction(formData);
    },
    [formAction]
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormContainer>
        <Input type="email" name="email" placeholder="Email" required />
        {authFormState.errors?.email && (
          <ErrorMessage className="error">
            {authFormState.errors.email}
          </ErrorMessage>
        )}
      </FormContainer>
      <FormContainer>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {authFormState.errors?.password && (
          <ErrorMessage className="error">
            {authFormState.errors.password}
          </ErrorMessage>
        )}
      </FormContainer>
      <SignUpButton />
      {authFormState.message && (
        <p className={authFormState.errors ? "error" : "success"}>
          {authFormState.message}
        </p>
      )}
    </Form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}
