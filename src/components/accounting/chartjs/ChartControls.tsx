"use client";

import { TransactionType } from "@/types/ExpenseType";
import { Select } from "@chakra-ui/react";

interface ChartControlsProps {
  type?: TransactionType;
  setType?: (type: TransactionType) => void;
}

const ChartControls = ({ type, setType }: ChartControlsProps) => {
  return (
    <>
      {type && setType && (
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          size="sm"
          borderRadius="xl"
          width="100px"
          border="none"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
      )}
    </>
  );
};

export default ChartControls;
