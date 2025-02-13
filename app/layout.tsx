import { Provider } from "@/store/provider/ChakraProvider";
import { ColorModeInit } from "@/store/provider/colorModeScript";

export const metadata = {
  title: "MoneyMind",
  description:
    "A comprehensive web application for tracking your personal finances, expenses, and budgeting needs",
  keywords: [
    "personal finance",
    "expense tracker",
    "budget management",
    "financial planning",
    "money management",
  ],
  icons: {
    icon: "/SVG/logo.svg",
    apple: "/SVG/logo.svg",
    shortcut: "/SVG/logo.svg",
  },
  authors: [{ name: "you yu hsuan" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ColorModeInit />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
