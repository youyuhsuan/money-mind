import { firebaseAuth } from "@/config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { authSchema } from "@/libs/schema";

// react form input get valid
export async function validateAuthInput(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  return authSchema.safeParse({ email, password });
}

async function authDispatch(formData: FormData, isLogin: boolean) {
  const validatedFields = await validateAuthInput(formData);
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
  const { email, password } = validatedFields.data;
  try {
    let result;
    if (isLogin) {
      result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const idToken = await result.user.getIdToken();
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          email,
          uid: result.user.uid,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create session");
      }
      return { success: "signup successful" };
    } else {
      result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return { user: result.user, success: "Registration successful" };
    }
  } catch (error) {
    console.error("An unexpected error occurred.");
    return error;
  }
}

export { authDispatch };
