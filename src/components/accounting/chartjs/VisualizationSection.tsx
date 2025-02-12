"use client";

import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  GridItem,
  Flex,
  Text,
} from "@chakra-ui/react";

import { Line, Doughnut } from "react-chartjs-2";
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

// Hook
import { useChart } from "@/hook/useChart";
import { useTransactionList } from "@/hook/useTransactionList";
import { useExpense } from "@/store/provider/ExpenseProvider";

// Utility
import { getCategoryColor } from "@/utility/getCategoryColor";

// Compoments
import TransactionsList from "@/components/accounting/TransactionsList";
import ChartCard from "@/components/accounting/chartjs/ChartCard";
import FilterInput from "@/components/accounting/FilterInput";
import FilterButton from "@/components/accounting/FilterButton";

import type {
  TimeSeriesData,
  TimeSeriesValues,
  TransactionType,
} from "@/types/ExpenseType";

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

interface VisualizationSectionProps {
  timeframe: keyof TimeSeriesData;
}

const VisualizationSection = ({ timeframe }: VisualizationSectionProps) => {
  const [type, setType] = useState<TransactionType>("expense");
  const { state } = useExpense();
  const {
    expenses,
    transactions,
    calculateTotals,
    calculateFinancialMetrics,
    calculateAverage,
    calculateGrowth,
    calculateCategorys,
  } = state;

  const {
    categoryDistributionConfig,
    categoryDistributionOptions,
    trendChartConfig,
    trendChartOptions,
  } = useChart();
  const {
    displayTransactions,
    tableRef,
    sortConfig,
    handleSort,
    handleDelete,
    searchState,
    setSearchValue,
    setFilter,
    addFilter,
    deleteFilter,
  } = useTransactionList();
  const isTimeSeriesEmpty = !transactions;

  const totalsValue = calculateTotals(timeframe);
  const profitMetricsValue = calculateFinancialMetrics(timeframe);
  const growthValue = calculateGrowth(timeframe);

  const categorys = calculateCategorys(timeframe);
  const isCategorys = categorys.categories.length === 0;

  return (
    <Box w="full">
      <Heading size="sm" mb={4}>
        Summary
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 24 }} spacing={10} mb={16}>
        <GridItem colSpan={{ base: 1, lg: 16 }}>
          <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={6}>
            {/* Summary Section */}
            <GridItem colSpan={{ base: 1, lg: 12 }}>
              <ChartCard
                title="Financial Overview"
                isEmpty={isTimeSeriesEmpty}
                footer={
                  <SimpleGrid
                    columns={{ base: 1, lg: 12 }}
                    spacing={6}
                    color="brand.mono.black"
                  >
                    <GridItem colSpan={{ base: 1, lg: 4 }}>
                      <Stat>
                        <StatLabel textAlign="left" mb="3">
                          Income
                        </StatLabel>
                        <StatNumber mb="2" fontSize={32}>
                          ${totalsValue.income}
                        </StatNumber>
                        <StatHelpText fontSize={12}>
                          <StatArrow type="increase" color="dark" />
                          {growthValue.income.toFixed(2)} % vs last {timeframe}
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, lg: 4 }}>
                      <Stat>
                        <StatLabel textAlign="left" mb="3">
                          Expense
                        </StatLabel>
                        <StatNumber mb="2" fontSize={32}>
                          ${totalsValue.expense}
                        </StatNumber>
                        <StatHelpText fontSize={12}>
                          <StatArrow type="decrease" color="dark" />
                          {growthValue.expense.toFixed(2)} % vs last {timeframe}
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, lg: 4 }}>
                      <Stat>
                        <StatLabel textAlign="left" mb="3">
                          Saving
                        </StatLabel>
                        <StatNumber mb="2" fontSize={32}>
                          ${profitMetricsValue.netIncome}
                        </StatNumber>
                        <StatHelpText fontSize={12}>
                          <StatArrow
                            color="dark"
                            type={
                              profitMetricsValue.isProfit
                                ? "increase"
                                : "decrease"
                            }
                          />
                          {profitMetricsValue.profitMargin.toFixed(2)}% profit
                          margin
                        </StatHelpText>
                      </Stat>
                    </GridItem>
                  </SimpleGrid>
                }
              ></ChartCard>
            </GridItem>

            {/* Distribution Chart */}
            <GridItem colSpan={{ base: 1, lg: 12 }}>
              <ChartCard
                title="Money flow"
                chart={
                  <Box height="400px" p="2">
                    <Line
                      data={trendChartConfig(timeframe)}
                      options={trendChartOptions}
                      aria-label="Money flow"
                    />
                  </Box>
                }
              />
            </GridItem>
          </SimpleGrid>
        </GridItem>

        {/* Category Distribution */}
        <GridItem colSpan={{ base: 1, lg: 8 }}>
          <ChartCard
            title="Category Distribution"
            isEmpty={
              isCategorys ||
              (type === "expense" && !categorys.summary.totalExpense) ||
              (type === "income" && !categorys.summary.totalIncome)
            }
            typeControls
            setType={setType}
            type={type}
            chart={
              <Box height="300px" p="2">
                <Doughnut
                  data={categoryDistributionConfig(
                    timeframe,
                    type as keyof TimeSeriesValues
                  )}
                  options={categoryDistributionOptions}
                  aria-label="Category Distribution"
                />
              </Box>
            }
            footer={
              <SimpleGrid spacing={3}>
                {calculateCategorys(timeframe)
                  .categories.filter((cat) => cat[type] > 0)
                  .map(
                    (
                      categoryData: {
                        [x: string]:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        category:
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | Promise<React.AwaitedReactNode>
                          | null
                          | undefined;
                        incomePercentage: any;
                        expensePercentage: any;
                      },
                      index
                    ) => (
                      <Flex
                        key={index}
                        direction="row"
                        justify="space-between"
                        align="center"
                      >
                        <Flex align="center">
                          <Box
                            w={3}
                            h={3}
                            borderRadius="full"
                            bg={getCategoryColor(
                              categoryData.category as string
                            )}
                            mr={2}
                          />
                          <Text fontSize="sm" fontWeight="medium">
                            {categoryData.category}
                          </Text>
                        </Flex>
                        <Flex gap="2" alignItems="center">
                          <Text fontSize="lg" fontWeight="bold">
                            ${categoryData[type]}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {(type === "income"
                              ? categoryData.incomePercentage
                              : categoryData.expensePercentage
                            ).toFixed(1)}
                            %
                          </Text>
                        </Flex>
                      </Flex>
                    )
                  )}
              </SimpleGrid>
            }
          />
        </GridItem>
      </SimpleGrid>

      {/* Transactions List */}
      <Flex direction="column">
        <Flex mb={6}>
          <Heading size="sm" mb={4}>
            Transactions: {!expenses ? 0 : expenses.length} | Total Items
          </Heading>
          <Flex gap={2} ml="auto" alignItems="center">
            <FilterButton
              filters={searchState.filters}
              setFilter={setFilter}
              addFilter={addFilter}
              deleteFilter={deleteFilter}
            />
            <FilterInput
              inputValue={searchState.searchValue}
              setFilterValue={setSearchValue}
            />
          </Flex>
        </Flex>
        {displayTransactions && (
          <TransactionsList
            displayTransactions={displayTransactions}
            tableRef={tableRef}
            sortConfig={sortConfig}
            handleSort={handleSort}
            handleDelete={handleDelete}
          />
        )}
      </Flex>
    </Box>
  );
};

export default VisualizationSection;
