"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Icon,
} from "@chakra-ui/react";
import { X, Search } from "lucide-react";

interface FilterInputProps {
  onFilterChange?: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const FilterInput: React.FC<FilterInputProps> = ({
  onFilterChange,
  placeholder = "Search...",
  debounceTime = 300,
}) => {
  // Track both the immediate input value and the debounced filter value
  const [inputValue, setInputValue] = useState("");

  // Create a debounced version of the filter change handler
  const debouncedFilterChange = useCallback(() => {
    let timeoutId: NodeJS.Timeout;

    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onFilterChange?.(value);
      }, debounceTime);
    };
  }, [debounceTime, onFilterChange]);

  // Memoize the debounced function to maintain reference stability
  const debouncedHandler = useMemo(
    () => debouncedFilterChange(),
    [debouncedFilterChange]
  );

  // Handle input changes with debouncing
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedHandler(newValue);
  };

  // Clear the input and filter
  const handleClear = () => {
    setInputValue("");
    onFilterChange?.("");
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
          bg="white"
          _hover={{ borderColor: "gray.300" }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
        />
        <InputRightElement width="4.5rem">
          {/* Show clear button only when there's input */}
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
