"use client";

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
  useBreakpointValue,
} from "@chakra-ui/react";

// components
import Header from "@/components/accounting/Header";
import TransactionsButton from "@/components/accounting/form/TransactionsButton";
import TransactionsSummary from "@/components/accounting/TransactionsSummary";
import FilterInput from "@/components/accounting/FilterInput";

// hook
import { useTransactionManager } from "@/hook/useTransactionManager";
import { useExpense } from "@/store/provider/ExpenseProvider";
import VisualizationSection from "@/components/accounting/chartjs/VisualizationSection";

const TransactionDashboard = () => {
  const { isLoading } = useTransactionManager();
  const { state } = useExpense();

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (isLoading)
    return (
      <Center h="200px">
        <Spinner size="lg" />
      </Center>
    );

  return (
    <Container maxW="8xl" mt={30} centerContent>
      <Flex
        minWidth="max-content"
        alignItems="center"
        w="full"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 4, md: 8 }}
      >
        <Header />
        <Flex ml="auto" gap={2}>
          <FilterInput />
          <TransactionsButton />
        </Flex>
      </Flex>
      <Container
        maxW="container.lg"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 4, md: 8 }}
      >
        <TransactionsSummary />
        <VStack w="full">
          {state.expenses ? (
            <VisualizationSection />
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
