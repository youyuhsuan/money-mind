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
import type { TimeSeriesData, TransactionType } from "@/types/ExpenseType";

interface ChartCard {
  title: string;
  chart?: React.ReactNode;
  typeControls?: boolean;
  footer?: React.ReactNode;
  type?: TransactionType;
  setType?: (type: TransactionType) => void;
  isEmpty?: boolean;
  emptyIcon?: React.ElementType;
}

const ChartCard = ({
  title,
  chart,
  typeControls = false,
  footer,
  type,
  setType,
  isEmpty = false,
  emptyIcon,
}: ChartCard) => {
  return (
    <Flex
      p={6}
      direction="column"
      height="full"
      borderRadius="xl"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      bg={
        title === "Financial Overview"
          ? "brand.primary.dark"
          : "brand.mono.white"
      }
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      {isEmpty ? (
        <>
          <Flex justify="space-between" align="center" mb="6">
            <Heading fontSize="xs">{title}</Heading>
            {typeControls && type && setType && (
              <ChartControls type={type} setType={setType} />
            )}
          </Flex>
          <Flex direction="column" justify="space-between" align="center">
            <Icon as={emptyIcon} w={12} h={12} my="2" />
            <Text fontSize="sm">No data available yet</Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex justify="space-between" align="center">
            <Heading fontSize="xs">{title}</Heading>
            {typeControls && type && setType && (
              <ChartControls type={type} setType={setType} />
            )}
          </Flex>

          {/* chart */}
          <Flex direction="column">
            {chart && (
              <Box position="relative" flex="1" p="2">
                {chart}
              </Box>
            )}

            {footer && (
              <Box
                mt={4}
                textAlign="center"
                flex="1"
                fontSize="sm"
                color="gray.600"
              >
                {footer}
              </Box>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ChartCard;
