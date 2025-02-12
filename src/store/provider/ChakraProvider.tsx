import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme/theme";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
