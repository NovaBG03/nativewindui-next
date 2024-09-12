import type { Config } from "tailwindcss";

import base from "@acme/tailwind-config/base";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/app/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [base],
  important: "html",
};

export default config;
