"use client ";

import { Box, VStack } from "@chakra-ui/react";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import type { TimeSeriesValues } from "@/types/ExpenseType";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { PieChart } from "lucide-react";

interface TodaySummaryProps {
  timeSeriesData: Record<string, TimeSeriesValues>;
  dailyDoughnut: ChartData<"doughnut">;
  dailyDoughnuOptions: ChartOptions<"doughnut">;
  totalsFooter?: React.ReactNode;
}

const TodaySummary = ({
  timeSeriesData,
  dailyDoughnut,
  dailyDoughnuOptions,
}: TodaySummaryProps) => {
  const dailyData = Object.values(timeSeriesData)[0];
  const isEmpty = !dailyData.income && !dailyData.expense;

  const total = Object.values(dailyData).reduce((acc, num) => (acc += num), 0);

  return (
    <VStack spacing={4} bg="white" borderRadius="lg">
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
        <ChartCard
          title="Daily Distribution"
          chart={
            <Doughnut data={dailyDoughnut} options={dailyDoughnuOptions} />
          }
          total={total}
          isEmpty={isEmpty}
          emptyIcon={PieChart}
          emptyStateMessage={
            "Start adding transactions to see your daily income distribution"
          }
        />
      </Box>
    </VStack>
  );
};

export default TodaySummary;
