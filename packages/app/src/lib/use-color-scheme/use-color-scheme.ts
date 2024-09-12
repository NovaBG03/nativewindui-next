import { useColorScheme as useNativewindColorScheme } from "nativewind/dist/stylesheet";
import { Platform } from "react-native";
import { COLORS } from "../../theme/colors";
import { setNavigationBar } from "../set-navigation-bar";

export const useColorScheme = () => {
  const { colorScheme, setColorScheme: setNativeWindColorScheme } =
    useNativewindColorScheme();

  async function setColorScheme(colorScheme: "light" | "dark") {
    setNativeWindColorScheme(colorScheme);
    if (Platform.OS !== "android") return;
    try {
      await setNavigationBar(colorScheme);
    } catch (error) {
      console.error('useColorScheme.tsx", "setColorScheme', error);
    }
  }

  function toggleColorScheme() {
    return setColorScheme(colorScheme === "light" ? "dark" : "light");
  }

  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
    colors: COLORS[colorScheme ?? "light"],
  };
};
