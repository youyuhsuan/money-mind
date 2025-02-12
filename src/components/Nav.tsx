"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  useColorMode,
} from "@chakra-ui/react";

import { useSession } from "@/hook/useSession";
import PillButton from "./PillButton";

const Nav = () => {
  const router = useRouter();
  const { sessionData } = useSession();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box
      as="nav"
      width="100%"
      py={4}
      top={0}
      position="fixed"
      zIndex="9999"
      sx={{
        scrollBehavior: "smooth",
        scrollMarginTop: "6rem",
      }}
    >
      <Container maxW="8xl">
        <Flex justify="space-between">
          <Link href="/">
            <Flex gap="2">
              <Image
                src="/SVG/logo.svg"
                alt="MoneyMind Logo"
                width={40}
                height={40}
              />
            </Flex>
          </Link>
          {sessionData ? (
            <Button onClick={handleLogout} variant="link">
              Log out
            </Button>
          ) : (
            <Flex gap={4}>
              <PillButton
                variant="secondary"
                onClick={() => router.push("/auth/register")}
              >
                Sign up
              </PillButton>
              <PillButton
                variant="primary"
                onClick={() => router.push("/auth/login")}
              >
                Sign in
              </PillButton>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
