"use client";

import { Box, VStack, Text, HStack, Icon } from "@chakra-ui/react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ label, value, color }: StatCardProps) => {
  return (
    <Box
      w="full"
      p={4}
      bg="white"
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.100"
      _hover={{
        transform: "translateY(-2px)",
        transition: "all 0.2s",
      }}
    >
      <VStack align="start" spacing={2}>
        <Text fontSize="sm" color="gray.500">
          {label}
        </Text>
        <HStack spacing={2} align="center">
          <Text fontSize="2xl" fontWeight="bold" color={color}>
            ${value.toLocaleString()}
          </Text>
          <Icon
            as={value >= 0 ? ArrowUpCircle : ArrowDownCircle}
            color={color}
          />
        </HStack>
      </VStack>
    </Box>
  );
};
export default StatCard;
