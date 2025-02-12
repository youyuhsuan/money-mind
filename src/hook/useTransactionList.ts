import { useState, useMemo, useRef, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

// Hook
import { useTransactionManager } from "@/hook/useTransactionManager";
import { useExpense } from "@/store/provider/ExpenseProvider";
import type { TransactionFields } from "@/types/FormType";
import type { Filter, SearchState } from "@/types/FilterType";

export const useTransactionList = () => {
  const { deleteTransaction, dispatch } = useTransactionManager();
  const { state } = useExpense();
  const { expenses } = state;
  const toast = useToast();
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchState, setSearchState] = useState<SearchState>({
    searchValue: "",
    filters: [
      {
        id: 1,
        field: "type",
        operator: "contains",
        value: "",
      },
    ],
  });

  const [sortConfig, setSortConfig] = useState<{
    key: keyof TransactionFields | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  const setSearchValue = (value: string) => {
    setSearchState((prev) => ({
      ...prev,
      searchValue: value,
    }));
  };

  const setFilter = (id: number, field: keyof Filter, value: string) => {
    setSearchState((prev) => ({
      ...prev,
      filters: prev.filters.map((filter) => {
        if (filter.id === id) {
          const updatedFilter = { ...filter, [field]: value };
          if (field === "field") {
            switch (value) {
              case "amount":
              case "date":
                updatedFilter.operator = "equals";
                break;
              default:
                updatedFilter.operator = "contains";
            }
          }
          return updatedFilter;
        }
        return filter;
      }),
    }));
  };

  const addFilter = () => {
    setSearchState((prev) => ({
      ...prev,
      filters: [
        ...prev.filters,
        {
          id: prev.filters.length + 1,
          field: "",
          operator: "",
          value: "",
        },
      ],
    }));
  };

  const deleteFilter = (id: number) => {
    if (searchState.filters.length > 1) {
      setSearchState((prev) => ({
        ...prev,
        filters: prev.filters.filter((filter) => filter.id !== id),
      }));
    }
  };

  const sortedTransactions: any[] = useMemo(() => {
    if (!expenses) return [];
    if (!sortConfig.key) return expenses;

    return [...expenses].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof TransactionFields];
      const bValue = b[sortConfig.key as keyof TransactionFields];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [expenses, sortConfig]);

  const [displayTransactions, setDisplayTransactions] =
    useState(sortedTransactions);

  const flattenObject = (obj: any): string[] => {
    return Object.entries(obj).reduce((acc: string[], [key, value]) => {
      if (["createdAt", "id"].includes(key)) {
        return acc;
      }

      if (Array.isArray(value)) {
        return [...acc, ...value.map(String)];
      }
      if (value && typeof value === "object") {
        return [...acc, ...flattenObject(value)];
      }
      return [...acc, String(value)];
    }, []);
  };

  useEffect(() => {
    let filteredTransactions = sortedTransactions;
    console.log("searchState", searchState);

    // 處理搜尋邏輯
    if (searchState.searchValue.trim()) {
      const searchFilter = searchState.searchValue.toLowerCase();
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const searchableFields = [
          transaction.type,
          transaction.amount,
          transaction.date,
          transaction.paymentMethod,
          transaction.description,
          transaction.category?.join(" ") || "",
        ];
        return searchableFields.some((field) =>
          String(field).toLowerCase().includes(searchFilter)
        );
      });
    }

    // 處理篩選器邏輯
    const activeFilters = searchState.filters.filter(
      (filter) => filter.field && filter.operator && filter.value.trim()
    );

    if (activeFilters.length > 0) {
      let currentGroup = "and";
      let currentGroupResult = true;

      console.log("=== Starting Filter Process ===");
      console.log("Active Filters:", activeFilters);
      console.log("Initial Transactions:", filteredTransactions);

      filteredTransactions = filteredTransactions.filter((transaction) => {
        console.log("\n--- Processing Transaction ---", transaction);

        return activeFilters.every((filter) => {
          const fieldValue =
            transaction[filter.field as keyof typeof transaction];
          const filterValue = filter.value.toLowerCase();

          console.log("\nFilter Details:", {
            field: filter.field,
            operator: filter.operator,
            filterValue: filterValue,
            fieldValue: fieldValue,
          });

          let result = false;

          switch (filter.operator) {
            case "equals": // 添加 equals 的處理
              result = String(fieldValue) === filterValue;
              console.log("Equals:", { fieldValue, filterValue, result });
              return result;
            case "is":
              result = String(fieldValue).toLowerCase() === filterValue;
              console.log("Is:", { fieldValue, filterValue, result });
              return result;
            case "is_not":
              result = String(fieldValue).toLowerCase() !== filterValue;
              console.log("Is Not:", { fieldValue, filterValue, result });
              return result;
            case "contains":
              if (Array.isArray(fieldValue)) {
                return fieldValue.some((value) =>
                  String(value).toLowerCase().includes(filterValue)
                );
              }
              console.log("Contains:", {
                fieldValue,
                filterValue,
                result,
              });

              return String(fieldValue).toLowerCase().includes(filterValue);
            case "does_not_contain":
              result = !String(fieldValue).toLowerCase().includes(filterValue);
              console.log("Does Not Contain:", {
                fieldValue,
                filterValue,
                result,
              });
              return result;
            case "starts_with":
              result = String(fieldValue).toLowerCase().startsWith(filterValue);
              console.log("Starts With:", { fieldValue, filterValue, result });
              return result;
            case "ends_with":
              result = String(fieldValue).toLowerCase().endsWith(filterValue);
              console.log("Ends With:", { fieldValue, filterValue, result });
              return result;
            case "is_empty":
              result = !fieldValue || String(fieldValue).trim() === "";
              console.log("Is Empty:", { fieldValue, result });
              return result;
            case "is_not_empty":
              result = fieldValue && String(fieldValue).trim() !== "";
              console.log("Is Not Empty:", { fieldValue, result });
              return result;
            case "greater_than":
              result = Number(fieldValue) > Number(filterValue);
              console.log("Greater Than:", { fieldValue, filterValue, result });
              return result;
            case "less_than":
              result = Number(fieldValue) < Number(filterValue);
              console.log("Less Than:", { fieldValue, filterValue, result });
              return result;
            case "greater_or_equal":
              result = Number(fieldValue) >= Number(filterValue);
              console.log("Greater Or Equal:", {
                fieldValue,
                filterValue,
                result,
              });
              return result;
            case "less_or_equal":
              result = Number(fieldValue) <= Number(filterValue);
              console.log("Less Or Equal:", {
                fieldValue,
                filterValue,
                result,
              });
              return result;
            case "before":
              result = new Date(fieldValue) < new Date(filterValue);
              console.log("Before:", { fieldValue, filterValue, result });
              return result;
            case "after":
              result = new Date(fieldValue) > new Date(filterValue);
              console.log("After:", { fieldValue, filterValue, result });
              return result;
            default:
              console.log("Default case - no operator match");
              return true;
          }
        });
      });

      console.log("=== Final Filtered Transactions ===", filteredTransactions);
    }

    setDisplayTransactions(filteredTransactions);
  }, [searchState, sortedTransactions]);

  const handleSort = (e: React.MouseEvent, key: keyof TransactionFields) => {
    e.preventDefault();
    e.stopPropagation();
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this transaction?"))
        return;
      dispatch({ type: "DELETE_EXPENSE", id });
      await deleteTransaction(id);
      toast({
        title: "Form submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Form submitted failed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setSortConfig({ key: null, direction: null });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return {
    sortedTransactions,
    tableRef,
    sortConfig,
    searchState,
    setFilter,
    addFilter,
    deleteFilter,
    setSearchValue,
    displayTransactions,
    handleSort,
    handleDelete,
  };
};
