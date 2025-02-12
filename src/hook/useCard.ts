import { useState } from "react";

export const useCard = () => {
  const [cards, setCards] = useState([
    {
      title: "Effortless Expense Tracking",
      description:
        "Track and categorize all transactions automatically. Get instant reports to manage your finances effortlessly.",
      src: "/animations/money.riv",
    },
    {
      title: "Smart Budget Planning",
      description:
        "Set goals and get personalized suggestions based on your spending patterns. Stay on track with smart budget monitoring.",
      src: "/animations/money.riv",
    },
    {
      title: "Financial Insights",
      description:
        "View your financial data through intuitive charts. Spot trends and make informed decisions with clear analytics.",
      src: "/animations/money.riv",
    },
  ]);

  return { cards, setCards };
};
