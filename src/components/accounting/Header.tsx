"use client";

import React from "react";
import {
  Container,
  Heading,
  Skeleton,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "@/hook/useSession";

const Header: React.FC = () => {
  const { isLoading, sessionData } = useSession();
  const smallestFontSize = useBreakpointValue({
    base: "xxs",
    md: "xs",
    lg: "s",
  });
  const regularFontSize = useBreakpointValue({ base: "xs", md: "s", lg: "md" });
  const headingSize = useBreakpointValue({ base: "s", md: "md", lg: "lg" });

  if (isLoading) {
    return (
      <Container maxW="container.xl" px={0}>
        <VStack w="full" align="start">
          <Skeleton>
            <Text fontSize={smallestFontSize}>Welcome back!</Text>
          </Skeleton>
          <Skeleton>
            <Heading as="h5" size={headingSize} mb={4}>
              loading@email.com
            </Heading>
          </Skeleton>
          <Skeleton>
            <Text fontWeight="bold" fontSize={regularFontSize}>
              Your Account Dashboard.
            </Text>
          </Skeleton>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" px={0}>
      {sessionData && (
        <VStack w="full" align="start">
          <Text fontSize={smallestFontSize}>Welcome back!</Text>
          <Heading as="h5" size={headingSize} mb={4}>
            {sessionData.userEmail}
          </Heading>
          <Text fontWeight="bold" fontSize={regularFontSize}>
            Your Account Dashboard.{" "}
          </Text>
        </VStack>
      )}
    </Container>
  );
};

export default Header;
