import { useCallback, useState } from "react";
import { useFormState } from "react-dom";
import { authDispatch } from "@/libs/authDispatch";
import type { AuthFormState } from "@/types/FormType";

const initialState: AuthFormState = {
  success: "",
  error: null,
  fieldValues: {
    email: "",
    password: "",
  },
};

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formValues, setFormValues] = useState({
    email: "test@gmail.com",
    password: "test01",
  });

  // Form state management
  const BoundDispatch = useCallback(
    async (_previousState: AuthFormState, formData: FormData) => {
      const result = await authDispatch(formData, isLogin);
      return result as AuthFormState;
    },
    [isLogin]
  );

  const [state, dispatch] = useFormState(BoundDispatch, initialState);

  // Form reset functionality
  const resetForm = useCallback(() => {
    setFormValues({
      email: "",
      password: "",
    });
  }, []);

  // Handle form value changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  return {
    isLogin,
    setIsLogin,
    formValues,
    setFormValues,
    handleInputChange,
    state,
    resetForm,
    dispatch,
  };
}
