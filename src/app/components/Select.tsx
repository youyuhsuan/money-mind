"use client";
import {
  Select as StyledSelect,
  SelectItem as StyledSelectItem,
} from "@/app/components/style/Select.styled";
import React, { useState } from "react";

const accountings = [
  { key: "income", label: "Income" },
  { key: "expend", label: "Expend" },
];

export default function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectItem] = useState(null);

  return (
    <StyledSelect onClick={() => setIsOpen(!isOpen)}>
      {selectedItem}
    </StyledSelect>
    // {isOpen && ()}
  );
}
