"use client";

import { useCallback, useMemo } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Icon,
} from "@chakra-ui/react";
import { X, Search } from "lucide-react";

interface FilterInputProps {
  inputValue: string;
  setFilterValue: (value: string) => void;
  placeholder?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  inputValue,
  setFilterValue,
  placeholder = "Search...",
}) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setFilterValue(newValue);
    },
    [setFilterValue]
  );

  const handleClear = () => {
    setFilterValue?.("");
  };

  return (
    <Box>
      <InputGroup>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          pr="2.5rem"
          borderRadius="md"
          bg="#faf9f0"
          _hover={{ borderColor: "brand.accent.light" }}
          _focus={{
            borderColor: "brand.accent.light",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
        />
        <InputRightElement width="4.5rem">
          {inputValue ? (
            <Icon
              as={X}
              onClick={handleClear}
              cursor="pointer"
              color="gray.500"
              _hover={{ color: "gray.700" }}
              aria-label="Clear search"
            />
          ) : (
            <Icon as={Search} color="gray.400" aria-label="Search" />
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default FilterInput;
