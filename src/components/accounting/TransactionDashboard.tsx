"use client";

import { useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import {
  Box,
  Center,
  Icon,
  Spinner,
  Text,
  VStack,
  Flex,
  Container,
} from "@chakra-ui/react";

// components
import Header from "@/components/accounting/Header";
import TransactionsButton from "@/components/accounting/form/TransactionsButton";
import VisualizationSection from "@/components/accounting/chartjs/VisualizationSection";
import TimeframeButtons from "@/components/accounting/ButtonGroup";

// hook
import { useTransactionManager } from "@/hook/useTransactionManager";
import { TimeSeriesData } from "@/types/ExpenseType";
import { useExpense } from "@/store/provider/ExpenseProvider";

const TransactionDashboard = () => {
  const [timeframe, setTimeframe] = useState<keyof TimeSeriesData>("weekly");
  const { isLoading } = useTransactionManager();
  const { state } = useExpense();
  const { transactions } = state;

  if (isLoading)
    return (
      <Center h="200px">
        <Spinner size="lg" />
      </Center>
    );

  return (
    <Container maxW="6xl" mt={30} centerContent>
      <Header timeframe={timeframe} />
      <Flex ml="auto" gap={2}>
        <TimeframeButtons timeframe={timeframe} setTimeframe={setTimeframe} />
        <TransactionsButton />
      </Flex>
      <Container
        maxW="container.xl"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 4, md: 8 }}
      >
        <VStack w="full">
          {transactions ? (
            <VisualizationSection timeframe={timeframe} />
          ) : (
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <VStack spacing={3}>
                <Icon as={Inbox} boxSize={8} color="gray.500" />
                <Text>
                  No transactions available. Add your first transaction to get
                  started!
                </Text>
              </VStack>
            </Flex>
          )}
        </VStack>
      </Container>
    </Container>
  );
};

export default TransactionDashboard;
