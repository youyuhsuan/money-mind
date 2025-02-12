"use client";

import { extendTheme } from "@chakra-ui/react";
import { quicksand } from "../../public/fonts/font";

export const theme = extendTheme({
  styles: {
    global: (props: { colorMode: "light" | "dark" }) => ({
      body: {
        bg: props.colorMode === "light" ? "#faf9f0" : "#171407",
        color: props.colorMode === "light" ? "#0f0e05" : "#faf9f0",
      },
    }),
  },
  fonts: {
    heading: quicksand.style.fontFamily,
    body: quicksand.style.fontFamily,
  },
  colors: {
    brand: {
      primary: { light: "#faf2cf", dark: "#ffd500" },
      secondary: { light: "#9ee0e1", dark: "#1e6062" },
      text: {
        light: "#171407",
        dark: "#faf9f0",
      },
      accent: {
        light: "#748bd4",
        dark: "#2b428c",
      },
      mono: {
        white: "#eeede5",
        black: "#161409",
        gray: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
