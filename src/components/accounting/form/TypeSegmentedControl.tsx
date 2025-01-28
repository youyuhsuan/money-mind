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
} from "@chakra-ui/react";

interface TypeProps {
  id: string;
  name: string;
  errors?: string;
  value: string;
  onChange: (value: string) => void;
}

const TypeSegmentedControl = ({
  id,
  name,
  value,
  errors,
  onChange,
}: TypeProps) => {
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
        bg="gray.50"
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
              onClick={() => onChange(option.value)}
              bg={isSelected ? "white" : "transparent"}
              color={option.value === "income" ? "gray.700" : "gray.500"}
              _hover={{
                bg: isSelected ? "white" : "gray.100",
              }}
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
