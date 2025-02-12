"use client";

import React, { useMemo } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Box,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";
import { TransactionType } from "@/types/FormType";

interface TypeProps {
  id: string;
  name: string;
  errors?: string;
  value: string;
  onChange: (type: TransactionType) => void;
}

const TypeSegmentedControl = ({
  id,
  name,
  value,
  errors,
  onChange,
}: TypeProps) => {
  const { colorMode } = useColorMode();

  const options = [
    { value: "income", label: "Income", icon: ArrowUpCircle },
    { value: "expense", label: "Expense", icon: ArrowDownCircle },
  ];

  const formInputProps = useMemo(
    () => ({
      name,
      value: JSON.stringify(value),
      type: "hidden",
      id: `${id}-hidden`,
    }),
    [id, name, value]
  );

  return (
    <FormControl isRequired isInvalid={!!errors}>
      <input {...formInputProps} />
      <FormLabel htmlFor={id}>Type</FormLabel>
      <ButtonGroup
        size="md"
        isAttached
        variant="outline"
        w="full"
        spacing="0"
        p="1"
        bg={colorMode === "light" ? "#faf9f0" : "#171407"}
        borderRadius="xl"
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          return (
            <Button
              key={option.value}
              flex="1"
              type="button"
              name={name}
              onClick={() => onChange(option.value as TransactionType)}
              bg={isSelected ? "#faf9f0" : "transparent"}
              _hover={{
                bg: isSelected ? "#faf9f0" : "gray.100",
              }}
              borderColor="#faf9f0"
              borderRadius="lg"
              boxShadow={isSelected ? "sm" : "none"}
              borderWidth="0"
            >
              <Box as={Icon} mr={2} />
              {option.label}
            </Button>
          );
        })}
      </ButtonGroup>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  );
};

export default TypeSegmentedControl;
