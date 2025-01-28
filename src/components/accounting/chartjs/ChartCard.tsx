import { TimeSeriesData } from "@/types/ExpenseType";
import { Flex, Box, Heading } from "@chakra-ui/react";
import ChartControls from "./ChartControls";

interface ChartCard {
  title: string;
  chart: React.ReactNode;
  controls?: boolean;
  footer?: React.ReactNode;
  timeframe?: keyof TimeSeriesData;
  setTimeframe?: (timeframe: keyof TimeSeriesData) => void;
}

const ChartCard = ({
  title,
  chart,
  controls,
  footer,
  timeframe,
  setTimeframe,
}: ChartCard) => {
  return (
    <Box
      p={6}
      borderRadius="xl"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      bg="white"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md" color="gray.700">
          {title}
        </Heading>
        {controls && timeframe && setTimeframe && (
          <ChartControls timeframe={timeframe} setTimeframe={setTimeframe} />
        )}
      </Flex>
      <Box height="300px">{chart}</Box>
      {footer && (
        <Box mt={4} textAlign="center" fontSize="sm" color="gray.600">
          {footer}
        </Box>
      )}
    </Box>
  );
};

export default ChartCard;
