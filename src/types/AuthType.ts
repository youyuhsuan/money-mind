import { UserCredential } from "firebase/auth";

type AuthProvider = "credentials" | "google";
type AuthAction = "signin" | "signup";

type AuthResult = {
  userCredential?: UserCredential;
  error?: string;
};

export type { AuthProvider, AuthAction, AuthResult };
