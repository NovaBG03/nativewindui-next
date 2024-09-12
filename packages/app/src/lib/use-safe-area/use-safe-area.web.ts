import type { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeArea: typeof useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});
