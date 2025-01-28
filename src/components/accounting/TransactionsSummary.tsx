"use client";

import { useExpense } from "@/store/provider/ExpenseProvider";
import {
  Box,
  SimpleGrid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function TransactionsSummary() {
  const { state } = useExpense();
  const { totals, growth } = state;
  return (
    <Box w="full" mb={8}>
      <Heading size="sm" mb={4}>
        Summary
      </Heading>
      <StatGroup>
        <Stat flex="1">
          <StatLabel>Current Balance</StatLabel>
          <StatNumber>${totals?.totals.toFixed(2)}</StatNumber>
        </Stat>
        <Stat flex="0.5">
          <StatLabel>Total Income</StatLabel>
          <StatNumber color="green.500">
            ${totals.incomeTotal.toFixed(2)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {growth.incomeMoM.toFixed(2)} % vs last month
          </StatHelpText>
        </Stat>
        <Stat flex="0.5">
          <StatLabel>Total Expense</StatLabel>
          <StatNumber color="red.500">
            ${totals.expenseTotal.toFixed(2)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            {growth.expenseMoM.toFixed(2)} % vs last month
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
}

export default TransactionsSummary;
