import { validateAuthInput } from "@/libs/authDispatch";
import { describe, it } from "node:test";
import { firebaseAuth, firebaseDB } from "@/config/firebaseConfig";
import { connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";

export const mockSignInWithEmailAndPassword = jest.fn();
export const mockCreateUserWithEmailAndPassword = jest.fn();

beforeAll(() => {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
});

describe("Auth Validation", () => {
  describe("validateAuthInput", () => {
    it("should validate correct email and password", async () => {
      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password123");

      const result = await validateAuthInput(formData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", async () => {
      const formData = new FormData();
      formData.append("email", "invalid-email");
      formData.append("password", "password123");

      const result = await validateAuthInput(formData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email format");
      }
    });

    it("should reject short password", async () => {
      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "12345");

      const result = await validateAuthInput(formData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must be at least 6 characters long"
        );
      }
    });
  });
  describe("Auth Tests", () => {
    test("should sign in with valid credentials", async () => {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        "test@example.com",
        "testpass123"
      );
      expect(userCredential.user).toBeTruthy();
    });
  });

  // describe("Firebase Authentication", () => {
  //   it("should mock Firebase authentication", async () => {
  //     const docRef = await addDoc(collection(firebaseDB, "users"), {
  //       name: "John Doe",
  //       email: "john@example.com",
  //     });
  //     const docSnap = await getDoc(docRef);
  //     expect(docSnap.exists()).toBe(true);
  //   });
  // });
});

afterEach(async () => {
  await firebaseAuth.signOut();
});
