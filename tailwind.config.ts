import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        bebasFont: ['"Bebas Neue"', "sans-serif"],
        outfitFont: ['"Outfit"', "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    backgroundImage: {
      "custom-bg": "url('/assets/site-assets/bleach-rebirth-of-souls-bg.png')",
    },
  },
  plugins: [],
} satisfies Config;
