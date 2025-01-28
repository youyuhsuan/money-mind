import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";

type BarChartData = Record<string, number>;

const BarChart = ({ data }: { data: BarChartData }) => {
  const total = Object.values(data).reduce(
    (acc, curr) => acc + Math.abs(curr),
    0
  );

  const chartData = Object.entries(data).map(([label, value]) => ({
    label,
    value,
    percentage: (Math.abs(value) / total) * 100,
    isNegative: value < 0,
  }));

  return (
    <VStack w="full" spacing={4} align="stretch">
      <HStack
        w="full"
        h="2"
        bg="gray.100"
        borderRadius="full"
        overflow="hidden"
      >
        {chartData.map(({ label, percentage, isNegative }) => (
          <Box
            key={label}
            h="full"
            w={`${percentage}%`}
            bg={isNegative ? "red.400" : "blue.400"}
            transition="all 0.3s"
          />
        ))}
      </HStack>

      <VStack spacing={2} align="stretch">
        {chartData.map(({ label, value, isNegative }) => (
          <HStack key={label} spacing={2}>
            <Box
              w="2"
              h="2"
              borderRadius="full"
              bg={isNegative ? "red.400" : "blue.400"}
            />
            <Text fontSize="sm">{label}</Text>
            <Text fontSize="sm" fontWeight="medium" ml="auto">
              ${Math.abs(value).toLocaleString()}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default BarChart;
