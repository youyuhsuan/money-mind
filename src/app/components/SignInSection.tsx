// LoggedInSection.tsx
"use client";

import { Button } from "@/app/components/style/Form.styled";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoggedInSectionProps {
  userEmail: string;
}

export default function LoggedInSection({ userEmail }: LoggedInSectionProps) {
  const router = useRouter();

  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      router.refresh();
    } catch (error: any) {
      console.log("Oops! We could not logout the user: " + error.message);
    }
  };

  return (
    <div>
      <h1>歡迎回來，{userEmail}！</h1>
      <Link href="/accounting">點擊開始</Link>
      <Button onClick={logoutUser}>登出</Button>
    </div>
  );
}
