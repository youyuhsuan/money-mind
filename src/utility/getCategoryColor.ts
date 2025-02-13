export const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    food: "#7389d4",
    transport: "#9ddee1",
    entertainment: "#ffd500",
    shopping: "rgb(75, 192, 192)",
    bills: "rgb(153, 102, 255)",
  };

  return colorMap[category.toLowerCase()] || "rgb(201, 203, 207)";
};
