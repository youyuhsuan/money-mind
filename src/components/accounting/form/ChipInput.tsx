"use client";

import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FormControl,
  FormLabel,
  Tag,
  Wrap,
  WrapItem,
  Input,
  Box,
  Text,
  TagLabel,
  TagCloseButton,
  useRadio,
  useRadioGroup,
  FormErrorMessage,
  HStack,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useTagInput } from "@/hook/useTagInput";
import { Span } from "next/dist/trace";

interface ChipInputProps {
  value: string[];
  errors?: string;
  onChange: (values: string[]) => void;
  maxTags?: number;
  placeholder?: string;
  storageKey?: string;
}

interface SuggestionsListProps {
  filteredSuggestions: string[];
  addTag: (tag: string) => void;
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  filteredSuggestions,
  addTag,
}) => {
  return (
    <HStack
      width="100%"
      display={filteredSuggestions.length > 0 ? "flex" : "none"}
      spacing={1}
      flexWrap="wrap"
      role="listbox"
      aria-label="Tag suggestions"
      color={"brand.mono.gray.400"}
      py={1}
      fontSize="xs"
    >
      <Box>Tag suggestions:</Box>
      {filteredSuggestions.map((suggestion: string) => (
        <Box
          key={suggestion}
          cursor="pointer"
          onClick={() => addTag(suggestion)}
          role="option"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              addTag(suggestion);
            }
          }}
        >
          {suggestion}
        </Box>
      ))}
    </HStack>
  );
};

export const ChipInput = ({
  value = [],
  onChange,
  errors,
  maxTags = 5,
  placeholder = "Type and press enter...",
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const {
    isInvalid,
    filteredSuggestions,
    addTag,
    handleKeyDown,
    removeTag,
    handleInputChange,
  } = useTagInput({
    value,
    onChange,
    errors,
    maxTags,
    inputValue,
    setInputValue,
  });

  console.log("filteredSuggestions", filteredSuggestions);

  const hiddenInputProps = {
    type: "hidden",
    name: "category",
    value: JSON.stringify(value),
    required: true,
  };

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>
        <Text display="inline">Tags</Text>{" "}
        <Text display="inline" color="red">
          *
        </Text>
      </FormLabel>
      <input {...hiddenInputProps} />
      <Box position="relative" borderColor={errors ? "red.300" : "inherit"}>
        <HStack
          spacing={2}
          wrap="wrap"
          borderWidth="1px"
          borderRadius="lg"
          px={[2, 4]}
          py={[1, 2]}
        >
          {value.map((tag) => (
            <Tag key={tag} size="md" variant="subtle">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
          {value.length < maxTags && (
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              size="sm"
              variant="unstyled"
              flex={1}
              minW="120px"
            />
          )}
        </HStack>
        <SuggestionsList
          filteredSuggestions={filteredSuggestions}
          addTag={addTag}
        />
      </Box>
      {errors && (
        <FormErrorMessage>At least one tag is required</FormErrorMessage>
      )}
    </FormControl>
  );
};
