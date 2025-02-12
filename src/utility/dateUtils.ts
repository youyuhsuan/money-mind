export const formatDateKey = (
  date: Date,
  format: "full" | "month" | "year" = "full"
) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "year":
      return `${year}`;
    case "month":
      return `${year}-${month}`;
    default:
      return `${year}/${month}/${day}`;
  }
};
