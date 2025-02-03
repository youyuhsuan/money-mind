"use client";

import { extendTheme } from "@chakra-ui/react";
import { quicksand } from "@/public/fonts/font";

export const theme = extendTheme({
  fonts: {
    heading: quicksand.style.fontFamily,
    body: quicksand.style.fontFamily,
  },
});
