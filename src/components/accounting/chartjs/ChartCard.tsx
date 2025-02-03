import { TimeSeriesData } from "@/types/ExpenseType";
import {
  Text,
  Flex,
  Box,
  Heading,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import ChartControls from "./ChartControls";

interface ChartCard {
  title: string;
  chart: React.ReactNode;
  controls?: boolean;
  total?: number;
  footer?: React.ReactNode;
  timeframe?: keyof TimeSeriesData;
  setTimeframe?: (timeframe: keyof TimeSeriesData) => void;
  isEmpty?: boolean;
  emptyIcon?: React.ElementType;
  emptyStateMessage?: string;
}

const ChartCard = ({
  title,
  chart,
  controls,
  total,
  footer,
  timeframe,
  setTimeframe,
  isEmpty = false,
  emptyIcon,
  emptyStateMessage,
}: ChartCard) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex
      p={6}
      height="full"
      direction="column"
      justifyContent="center"
      borderRadius="xl"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      bg={bgColor}
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      {isEmpty ? (
        <VStack
          spacing={3}
          py={12}
          color={textColor}
          align="center"
          justify="center"
        >
          <Heading fontSize="sm" color="gray.500">
            {title}
          </Heading>
          <Icon as={emptyIcon} w={12} h={12} />
          <Text fontSize="sm">No data available yet</Text>
          <Text fontSize="xs" textAlign="center" maxW="xs">
            {emptyStateMessage}
          </Text>
        </VStack>
      ) : (
        <>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading fontSize="sm" color="gray.500">
              {title}
            </Heading>
            {controls && timeframe && setTimeframe && (
              <ChartControls
                timeframe={timeframe}
                setTimeframe={setTimeframe}
              />
            )}
          </Flex>
          {/* chart */}
          <Box position="relative" flex="1" p="2">
            {chart}
            {total && (
              <VStack
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                spacing={1}
                pointerEvents="none"
                zIndex="1"
              >
                <Text fontSize="xs" color="gray.500">
                  Today&apos;s total
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="gray.700">
                  ${total}
                </Text>
              </VStack>
            )}
          </Box>

          {footer && (
            <Box mt={4} textAlign="center" fontSize="sm" color="gray.600">
              {footer}
            </Box>
          )}
        </>
      )}
    </Flex>
  );
};

export default ChartCard;
