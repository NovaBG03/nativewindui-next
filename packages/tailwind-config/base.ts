import type { Config } from "tailwindcss";

import { hairlineWidth, platformSelect } from "nativewind/theme";

// @ts-expect-error no types
import nativewind from "nativewind/preset";

const config: Config = {
  content: [],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        border: withOpacity("border"),
        input: withOpacity("input"),
        ring: withOpacity("ring"),
        background: withOpacity("background"),
        foreground: withOpacity("foreground"),
        primary: {
          DEFAULT: withOpacity("primary"),
          foreground: withOpacity("primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacity("secondary"),
          foreground: withOpacity("secondary-foreground"),
        },
        destructive: {
          DEFAULT: withOpacity("destructive"),
          foreground: withOpacity("destructive-foreground"),
        },
        muted: {
          DEFAULT: withOpacity("muted"),
          foreground: withOpacity("muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacity("accent"),
          foreground: withOpacity("accent-foreground"),
        },
        popover: {
          DEFAULT: withOpacity("popover"),
          foreground: withOpacity("popover-foreground"),
        },
        card: {
          DEFAULT: withOpacity("card"),
          foreground: withOpacity("card-foreground"),
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
};

export default config;

function withOpacity(variableName: string) {
  return platformSelect({
    ios: `rgb(var(--${variableName}) / <alpha-value>)`,
    android: `rgb(var(--android-${variableName}) / <alpha-value>)`,
    default: `rgb(var(--${variableName}) / <alpha-value>)`, // for web
  });
}
