export const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    Food: "rgb(255, 99, 132)",
    Transport: "rgb(54, 162, 235)",
    Entertainment: "rgb(255, 205, 86)",
    Shopping: "rgb(75, 192, 192)",
    Bills: "rgb(153, 102, 255)",
  };

  return colorMap[category] || "rgb(201, 203, 207)";
};
