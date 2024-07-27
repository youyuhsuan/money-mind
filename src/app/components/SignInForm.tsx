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

const initialState: AuthFormState = {
  message: "",
  errors: undefined,
  fieldValues: {
    email: "",
    password: "",
  },
};

export default function SignInForm() {
  const [authFormState, formAction] = useFormState(authenticate, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (authFormState.message === "Signin successful") {
      formRef.current?.reset();
    }
  }, [authFormState]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.set("action", "signin");
      formAction(formData);
    },
    [formAction]
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input type="email" name="email" placeholder="Email" required />
      {authFormState.errors?.email && (
        <ErrorMessage className="error">
          {authFormState.errors.email}
        </ErrorMessage>
      )}

      <Input type="password" name="password" placeholder="Password" required />
      {authFormState.errors?.password && (
        <ErrorMessage className="error">
          {authFormState.errors.password}
        </ErrorMessage>
      )}

      <LoginButton />

      {authFormState.message && (
        <p className={authFormState.errors ? "error" : "success"}>
          {authFormState.message}
        </p>
      )}
    </Form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}
