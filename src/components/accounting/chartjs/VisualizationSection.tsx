"use client";

import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  GridItem,
  Button,
  ButtonGroup,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

import { useExpense } from "@/store/provider/ExpenseProvider";
import { useChart } from "@/hook/useChart";

// compoments
import TransactionsList from "../TransactionsList";
import ChartCard from "./ChartCard";
import TodaySummary from "./TodaySummary";
import type { TimeSeriesData } from "@/types/ExpenseType";
import { Bar } from "react-chartjs-2";
import SimpleBarChart from "./BarChart";
import BarChart from "./BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VisualizationSection: React.FC = () => {
  const { state } = useExpense();

  const {
    dailyDoughnutData,
    dailyDoughnutOptions,
    categoryDoughnutData,
    categoryDoughnutOptions,
    lineData,
    lineOptions,
  } = useChart();
  const { totals, timeSeriesData, categoryData } = state;

  const [timeframe, setTimeframe] = useState<keyof TimeSeriesData>("weekly");

  return (
    <Box w="full">
      <SimpleGrid columns={{ base: 1, lg: 24 }} spacing={6}>
        <GridItem colSpan={{ base: 1, lg: 16 }}>
          <ChartCard
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            title="Transaction History"
            controls
            chart={<Line data={lineData(timeframe)} options={lineOptions} />}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 8 }}>
          <TodaySummary
            timeSeriesData={timeSeriesData}
            dailyDoughnut={dailyDoughnutData}
            dailyDoughnuOptions={dailyDoughnutOptions}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 6 }}>
          <ChartCard
            title="Income Distribution"
            chart={
              <Doughnut
                data={categoryDoughnutData}
                options={categoryDoughnutOptions}
              />
            }
            footer={<BarChart data={categoryData} />}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 24 }}>
          <TransactionsList />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default VisualizationSection;
