import { useCallback, useState } from "react";

interface UseTagSuggestionsProps {
  maxSuggestions?: number;
  storageKey?: string;
}

export function useTagSuggestions({
  maxSuggestions = 10,
  storageKey = "tagSuggestions",
}: UseTagSuggestionsProps = {}) {
  const [suggestions, setSuggestions] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToSuggestions = useCallback(
    (newTag: string) => {
      setSuggestions((prev) => {
        const filtered = prev.filter((tag) => tag !== newTag);
        const updated = [newTag, ...filtered].slice(0, maxSuggestions);

        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [maxSuggestions, storageKey]
  );

  return {
    suggestions,
    addToSuggestions,
  };
}
