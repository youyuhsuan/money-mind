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
import { useTagSuggestions } from "@/hook/useTagSuggestions";

interface ChipInputProps {
  value: string[];
  errors?: string;
  onChange: (values: string[]) => void;
  maxTags?: number;
  placeholder?: string;
  storageKey?: string;
}

interface SuggestionsListProps {
  showSuggestions: boolean;
  filteredSuggestions: string[];
  addTag: (tag: string) => void;
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  showSuggestions,
  filteredSuggestions,
  addTag,
}) => {
  return (
    <VStack
      position="absolute"
      top="100%"
      left={0}
      right={0}
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
      zIndex={1}
      maxH="200px"
      overflowY="auto"
      display={
        showSuggestions && filteredSuggestions.length > 0 ? "block" : "none"
      }
      spacing={0}
      transition="all 0.2s"
      role="listbox"
      aria-label="Tag suggestions"
    >
      {filteredSuggestions.map((suggestion: string) => (
        <Box
          key={suggestion}
          p={2}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          onClick={() => addTag(suggestion)}
          role="option"
          tabIndex={0}
          width="100%"
          textAlign="left"
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
    </VStack>
  );
};

export const ChipInput = ({
  value = [],
  onChange,
  errors,
  maxTags = 5,
  placeholder = "Type and press enter...",
  storageKey = "tagSuggestions",
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isInvalid, setIsInvalid] = useBoolean();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions, addToSuggestions } = useTagSuggestions({
    storageKey,
  });

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(
      (tag: string) =>
        !value.includes(tag) &&
        tag.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [suggestions, value, inputValue]);

  const addTag = useCallback(
    (newTag: string) => {
      if (value.length < maxTags && !value.includes(newTag)) {
        onChange([...value, newTag]);
        addToSuggestions(newTag);
        setInputValue("");
        setShowSuggestions(false);
      }
    },
    [value, maxTags, onChange, addToSuggestions]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  useEffect(() => {
    // Update invalid state based on both value length and errors
    setIsInvalid[value.length === 0 || !!errors ? "on" : "off"]();
  }, [value, errors, setIsInvalid]);

  // Hidden input for form submission
  const hiddenInputProps = {
    type: "hidden",
    name: "category",
    value: JSON.stringify(value),
    required: true,
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        const newTag = inputValue.trim();

        if (value.length < maxTags && !value.includes(newTag)) {
          onChange([...value, newTag]);
          setInputValue("");
        }
      }
    },
    [inputValue, value, maxTags, onChange]
  );

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((t) => t !== tag));
    },
    [value, onChange]
  );

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>Tags</FormLabel>
      <input {...hiddenInputProps} />
      <Box
        position="relative"
        borderWidth="1px"
        borderRadius="lg"
        px={[2, 4]}
        py={[1, 2]}
        borderColor={errors ? "red.300" : "inherit"}
      >
        <HStack spacing={2} wrap="wrap">
          {value.map((tag) => (
            <Tag key={tag} size="md" variant="subtle" colorScheme="blue">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
          {value.length < maxTags && (
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => setShowSuggestions(true)}
              placeholder={placeholder}
              size="sm"
              variant="unstyled"
              flex={1}
              minW="120px"
            />
          )}
        </HStack>
        <SuggestionsList
          showSuggestions={showSuggestions}
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
