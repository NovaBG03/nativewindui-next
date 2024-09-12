import type { Config } from "tailwindcss";

import base from "@acme/tailwind-config/base";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [base],
};

export default config;
