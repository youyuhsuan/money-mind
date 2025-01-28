"use client ";

import { Box, VStack, Text } from "@chakra-ui/react";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import type { TimeSeriesData, TimeSeriesValues } from "@/types/ExpenseType";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

interface TodaySummaryProps {
  timeSeriesData: TimeSeriesData;
  dailyDoughnut: ChartData<"doughnut">;
  dailyDoughnuOptions: ChartOptions<"doughnut">;
  totalsFooter?: React.ReactNode;
}

const TodaySummary = ({
  timeSeriesData,
  dailyDoughnut,
  dailyDoughnuOptions,
}: TodaySummaryProps) => {
  const dailyData = Object.values(timeSeriesData.daily)[0];

  return (
    <VStack spacing={4} p={4} bg="white" borderRadius="lg">
      <StatCard
        label="Today's Income"
        value={dailyData.income}
        color="green.500"
      />
      <StatCard
        label="Today's Expenses"
        value={dailyData.expense}
        color="red.500"
      />
      <Box flex={1} w="full">
        <Text mb={2} fontWeight="medium">
          Recent Transactions
        </Text>
        <ChartCard
          title="Daily Income Distribution"
          chart={
            <Doughnut data={dailyDoughnut} options={dailyDoughnuOptions} />
          }
          footer={dailyData.expense}
        />
      </Box>
    </VStack>
  );
};

export default TodaySummary;
