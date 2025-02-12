"use client";

import { Tag, TagLabel, Box } from "@chakra-ui/react";

// Utility
import { getCategoryColor } from "@/utility/getCategoryColor";

interface CategoryTagProps {
  category: string;
}

const CategoryTag = ({ category }: CategoryTagProps) => {
  return (
    <Box display="inline-block">
      <Tag
        size="sm"
        rounded="full"
        variant="subtle"
        bgColor={getCategoryColor(category)}
        color="white"
      >
        <TagLabel>{category}</TagLabel>
      </Tag>
    </Box>
  );
};

export default CategoryTag;
