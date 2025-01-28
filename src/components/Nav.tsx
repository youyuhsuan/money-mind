"use client";

import Link from "next/link";
import { Box, Container, Heading, Flex, Button } from "@chakra-ui/react";
import { useSession } from "@/hook/useSession";

const Nav = () => {
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
      zIndex="sticky"
      sx={{
        scrollBehavior: "smooth",
        scrollMarginTop: "6rem",
      }}
    >
      <Container maxW="8xl">
        <Flex justify="space-between">
          <Link href="/">
            <Heading
              as="h1"
              size="lg"
              bgGradient="linear(to-r, blue.500, blue.800)"
              bgClip="text"
            >
              MoneyMind
            </Heading>
          </Link>
          {/* <Box gap={4}>
            <Button onClick={handleLogout} colorScheme="teal" variant="link">
              Sign in
            </Button>
            <Button onClick={handleLogout} colorScheme="teal" variant="link">
              Sign up
            </Button>
          </Box> */}
          {sessionData ? (
            <Button onClick={handleLogout} colorScheme="teal" variant="link">
              Log out
            </Button>
          ) : null}
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
