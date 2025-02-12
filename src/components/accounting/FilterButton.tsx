"use client";

import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Select,
  Button,
  Input,
  IconButton,
  HStack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Filter, Plus, Trash2 } from "lucide-react";
import type { Filter as FilterType } from "@/types/FilterType";

interface FilterButtonProps {
  filters: FilterType[];
  setFilter: (id: number, field: keyof FilterType, value: string) => void;
  addFilter: () => void;
  deleteFilter: (id: number) => void;
}

const FilterButton = ({
  filters,
  setFilter,
  addFilter,
  deleteFilter,
}: FilterButtonProps) => {
  const { colorMode } = useColorMode();

  const getOperatorOptions = (fieldType: string) => {
    const commonOptions = [
      { value: "is", label: "Is" },
      { value: "isNot", label: "Is not" },
      { value: "contains", label: "Contains" },
      { value: "doesNotContain", label: "Does not contain" },
      { value: "startsWith", label: "Starts with" },
      { value: "endsWith", label: "Ends with" },
      { value: "isEmpty", label: "Is empty" },
      { value: "isNotEmpty", label: "Is not empty" },
    ];

    switch (fieldType) {
      case "amount":
        return [
          { value: "equals", label: "Equals" },
          { value: "doesNotEqual", label: "Does not equal" },
          { value: "greaterThan", label: "Greater than" },
          { value: "lessThan", label: "Less than" },
          { value: "greaterOrEqual", label: "Greater than or equal to" },
          { value: "lessOrEqual", label: "Less than or equal to" },
          { value: "isEmpty", label: "Is empty" },
          { value: "isNotEmpty", label: "Is not empty" },
        ];
      case "date":
        return [
          { value: "is", label: "Is" },
          { value: "isNot", label: "Is not" },
          { value: "before", label: "Before" },
          { value: "after", label: "After" },
          { value: "isEmpty", label: "Is empty" },
          { value: "isNotEmpty", label: "Is not empty" },
        ];
      default:
        return commonOptions;
    }
  };
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label="Filter"
        icon={<Filter size={16} />}
        variant="ghost"
        size="sm"
      />
      <MenuList
        minW="fit-content"
        bg={colorMode === "light" ? "#faf9f0" : "#171407"}
      >
        <VStack align="stretch" p={2}>
          {/* 篩選條件列表 */}
          {filters.map((filter, index) => (
            <HStack key={filter.id} spacing={2}>
              {/* Where/And/Or 選擇器 */}
              {index === 0 ? (
                <Text w="80px" fontSize="sm">
                  Where
                </Text>
              ) : (
                <Select
                  size="sm"
                  w="80px"
                  value={filter.field}
                  onChange={(e) =>
                    setFilter(filter.id, "field", e.target.value)
                  }
                >
                  <option value="and">And</option>
                  <option value="or">Or</option>
                </Select>
              )}

              {/* 運算符選擇 */}
              <Select
                size="sm"
                w="120px"
                value={filter.operator}
                onChange={(e) =>
                  setFilter(filter.id, "operator", e.target.value)
                }
              >
                {getOperatorOptions(filter.field).map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </Select>

              {/* 欄位選擇 */}
              <Select
                size="sm"
                w="120px"
                value={filter.field}
                onChange={(e) => setFilter(filter.id, "field", e.target.value)}
              >
                <option value="type">Type</option>
                <option value="amount">Amount</option>
                <option value="date">Date</option>
                <option value="category">Category</option>
                <option value="paymentMethod">Payment Method</option>
              </Select>

              {/* 值輸入 */}
              <Input
                placeholder="Value"
                size="sm"
                w="150px"
                value={filter.value}
                onChange={(e) => setFilter(filter.id, "value", e.target.value)}
              />

              {/* 行內操作按鈕 */}
              <IconButton
                aria-label="Delete filter"
                icon={<Trash2 size={14} />}
                size="sm"
                variant="ghost"
                onClick={() => deleteFilter(filter.id)}
              />
            </HStack>
          ))}

          {/* 底部操作按鈕 */}
          <HStack mt="4">
            <Button
              leftIcon={<Plus size={12} />}
              variant="ghost"
              textAlign="left"
              justifyContent="flex-start"
              w="full"
              size="sm"
              onClick={addFilter}
            >
              Add filter rule
            </Button>
          </HStack>

          <HStack>
            <Button
              leftIcon={<Trash2 size={12} />}
              variant="ghost"
              textAlign="left"
              justifyContent="flex-start"
              w="full"
              size="sm"
              onClick={() => {
                filters.forEach((filter) => deleteFilter(filter.id));
              }}
            >
              Delete filter
            </Button>
          </HStack>
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default FilterButton;
