"use client";

import { TimeSeriesData } from "@/types/ExpenseType";
import { ButtonGroup, Button, useColorModeValue } from "@chakra-ui/react";

interface TimeframeButtonsProps {
  timeframe: keyof TimeSeriesData;
  setTimeframe: (timeframe: keyof TimeSeriesData) => void;
}

const TimeframeButtons = ({
  timeframe: selectedTimeframe,
  setTimeframe,
}: TimeframeButtonsProps) => {
  const selectedBg = useColorModeValue(
    "brand.accent.light",
    "brand.accent.dark"
  );
  const selectedColor = useColorModeValue(
    "brand.text.dark",
    "brand.text.light"
  );
  const defaultBg = useColorModeValue("#f5f4eb", "#2a2a24");
  const hoverBg = useColorModeValue("#eeede5", "#353530");
  const timeframes: Array<{ value: keyof TimeSeriesData; label: string }> = [
    { value: "daily", label: "Day" },
    { value: "weekly", label: "Week" },
    { value: "monthly", label: "Month" },
    { value: "yearly", label: "Year" },
    { value: "all", label: "All" },
  ];

  return (
    <ButtonGroup size="md" isAttached variant="outline">
      {timeframes.map((timeframe) => (
        <Button
          key={timeframe.value}
          bg={selectedTimeframe === timeframe.value ? selectedBg : defaultBg}
          color={
            selectedTimeframe === timeframe.value ? selectedColor : "inherit"
          }
          onClick={() => setTimeframe(timeframe.value)}
          _hover={{
            bg: selectedTimeframe === timeframe.value ? selectedBg : hoverBg,
          }}
          borderColor="#faf9f0"
        >
          {timeframe.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TimeframeButtons;
