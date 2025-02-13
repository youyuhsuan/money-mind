import { useEffect, useCallback, useMemo } from "react";
import { useBoolean } from "@chakra-ui/react";
import { useTagSuggestions } from "./useTagSuggestions";
import { getCookie } from "@/utility/getCookie";

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; secure; samesite=strict`;
};

export const useTagInput = ({
  value,
  onChange,
  errors,
  maxTags,
  inputValue,
  setInputValue,
}: any) => {
  const [isInvalid, setIsInvalid] = useBoolean();
  const { suggestions, addToSuggestions } = useTagSuggestions();

  const updateTagsInCookie = (tags: string[]) => {
    const updatedTags = tags.slice(0, 3);
    setCookie("tags", JSON.stringify(updatedTags), 7);
  };

  const addTag = useCallback(
    (newTag: string) => {
      if (value.length < maxTags && !value.includes(newTag)) {
        onChange([...value, newTag]);
        addToSuggestions(newTag);
        setInputValue("");
      }
    },
    [value, maxTags, onChange, addToSuggestions, setInputValue]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        const newTag = inputValue.trim();

        if (value.length < maxTags && !value.includes(newTag)) {
          onChange([...value, newTag]);
          setInputValue("");
          updateTagsInCookie([...value, newTag]);
        }
      }
    },
    [inputValue, value, maxTags, onChange, setInputValue]
  );

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((t: string) => t !== tag));
    },
    [value, onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setIsInvalid[value.length === 0 || !!errors ? "on" : "off"]();
  }, [value, errors, setIsInvalid]);

  const filteredSuggestions = useMemo(() => {
    const filtered = suggestions.filter(
      (tag: string) =>
        !value.includes(tag) &&
        tag.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filtered;
  }, [suggestions, value, inputValue]);

  useEffect(() => {
    const savedTags = getCookie("tags");
    if (savedTags) {
      try {
        const parsedTags = JSON.parse(savedTags);
        if (Array.isArray(parsedTags) && parsedTags.length > 0) {
          parsedTags.forEach((tag) => addToSuggestions(tag));
        }
      } catch (error) {
        console.error("Error parsing tags from cookie:", error);
      }
    }
  }, []);

  return {
    isInvalid,
    filteredSuggestions,
    addTag,
    handleKeyDown,
    removeTag,
    handleInputChange,
  };
};
