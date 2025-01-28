"use client";

import { TimeSeriesData } from "@/types/ExpenseType";
import { Select } from "@chakra-ui/react";

interface ChartControlsProps {
  timeframe: keyof TimeSeriesData;
  setTimeframe: (timeframe: keyof TimeSeriesData) => void;
}

const ChartControls = ({ timeframe, setTimeframe }: ChartControlsProps) => (
  <Select
    value={timeframe}
    onChange={(e) => setTimeframe(e.target.value as keyof TimeSeriesData)}
    size="sm"
    borderRadius="xl"
    width="120px"
  >
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
  </Select>
);

export default ChartControls;
