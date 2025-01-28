import { useState } from "react";

export const useCard = () => {
  const [cards, setCards] = useState([
    {
      title: "Effortless Expense Tracking",
      description:
        "Track and categorize all transactions automatically. Get instant reports to manage your finances effortlessly.",
    },
    {
      title: "Smart Budget Planning",
      description:
        "Set goals and get personalized suggestions based on your spending patterns. Stay on track with smart budget monitoring.",
    },
    {
      title: "Financial Insights",
      description:
        "View your financial data through intuitive charts. Spot trends and make informed decisions with clear analytics.",
    },
  ]);

  return { cards, setCards };
};
