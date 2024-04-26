import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "rust",
      addCommonColors: true,
      themes: {
        light: {
          colors: {},
        },
        dark: {
          colors: {
            primary: "#1e2020",
            secondary: "#f6eae0",
          },
        },
        rust: {
          colors: {
            background: "#1e2020",
            foreground: "#ce422b",
            secondary: "#f6eae0",
            primary: {
              foreground: "#ffffff",
              DEFAULT: "#1e2020",
            }
          },
        },
      },
    }),
  ],
};
export default config;
