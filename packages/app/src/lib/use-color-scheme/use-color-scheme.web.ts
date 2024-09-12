import type { useColorScheme as useColorSchemeType } from "./use-color-scheme";
import { COLORS } from "../../theme/colors";

export const useColorScheme: typeof useColorSchemeType = () => {
  const colorScheme = "light" as "light" | "dark" | undefined;

  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme: async () => {
      console.warn("setColorScheme is not implemented on web");
    },
    toggleColorScheme: async () => {
      console.warn("toggleColorScheme scheme is not implemented on web");
    },
    colors: COLORS[colorScheme ?? "light"],
  };
};
