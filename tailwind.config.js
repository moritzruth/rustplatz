/* eslint-disable unicorn/no-keyword-prefix */
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors.js")

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./index.html",
      "./src/**/*.vue",
      "./src/**/*.js"
    ]
  },
  theme: {
    fontSize: {
      "xs": ["0.75rem", "0.5rem"],
      "sm": ["0.875rem", "0.75rem"],
      "base": ["1rem", "1rem"],
      "lg": ["1.125rem", "1.25rem"],
      "xl": ["1.25rem", "1.1rem"],
      "2xl": ["1.5rem", "1.25rem"],
      "3xl": ["1.875rem", "1.5rem"],
      "4xl": ["2.25rem", "1.9rem"],
      "5xl": ["3rem", "2.4rem"]
    },
    extend: {
      screens: {
        "can-hover": { raw: "(hover: hover)" },
        "cannot-hover": { raw: "(hover: none)" }
      },
      scale: {
        103: "1.03"
      },
      fontFamily: {
        sans: ["Goldman", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.trueGray,
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#7EFF93",
          400: "#4af665",
          500: "#2fdb4a",
          600: "#27c640",
          700: "#1cae33",
          800: "#159128",
          900: "#0f721e"
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#e55c46",
          600: "#dd4a32",
          700: "#cb3821",
          800: "#b82a14",
          900: "#911c0a"
        }
      }
    }
  },
  variants: {
    extend: {
    }
  }
}
