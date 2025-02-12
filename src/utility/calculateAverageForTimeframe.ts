export const calculateAverageForTimeframe = (
  data: Record<string, { total: { expense: number } }>,
  filterFn = (expense: number) => expense > 0
) => {
  const expenses = Object.values(data)
    .map((item) => item.total.expense)
    .filter(filterFn);

  if (expenses.length === 0) return "0.00";

  const total = expenses.reduce((sum, expense) => sum + expense, 0);
  return (total / expenses.length).toFixed(2);
};
