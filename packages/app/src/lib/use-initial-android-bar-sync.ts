import React from "react";
import { useColorScheme } from "./use-color-scheme";
import { Platform } from "react-native";
import { setNavigationBar } from "./set-navigation-bar";

/**
 * Set the Android navigation bar color based on the color scheme.
 */
export const useInitialAndroidBarSync = () => {
  const { colorScheme } = useColorScheme();
  React.useEffect(() => {
    if (Platform.OS !== "android") return;
    setNavigationBar(colorScheme).catch((error) => {
      console.error('useColorScheme.tsx", "useInitialColorScheme', error);
    });
  }, []);
};
