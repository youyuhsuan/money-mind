"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
  Skeleton,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

// hook
import { useSession } from "@/hook/useSession";

import type { TimeSeriesData } from "@/types/ExpenseType";
import { useExpense } from "@/store/provider/ExpenseProvider";

interface HeaderProps {
  timeframe: keyof TimeSeriesData;
}

const Header = ({ timeframe }: HeaderProps) => {
  const { isLoading, sessionData } = useSession();
  const { state } = useExpense();
  const { calculateTotals } = state;
  const totalValue = calculateTotals(timeframe);
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
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
      {sessionData && (
        <VStack align="start" spacing={{ base: 4, md: 3 }} my={14}>
          {/* Welcome Section */}

          <Box>
            <Text fontSize="sm" color="gray.600" fontWeight="medium" mb={1}>
              Welcome back!
            </Text>
            <Heading fontSize={headingSize} fontWeight="bold">
              {sessionData.userEmail}
            </Heading>
          </Box>

          {/* Balance Display */}
          <Box>
            <Text
              fontSize={{ base: "3xl", md: "7xl" }}
              fontWeight="bold"
              letterSpacing="1px"
            >
              $ {totalValue.totals.toLocaleString()}
            </Text>
          </Box>
        </VStack>
      )}
    </Container>
  );
};

export default Header;
