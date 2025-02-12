"use client";

import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/theme/theme";

export function ColorModeInit() {
  return <ColorModeScript initialColorMode={theme.config.initialColorMode} />;
}
