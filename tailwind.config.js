/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // Main background color for primary areas (white background)
        secondary: {
          DEFAULT: "#161622", // Dark background for secondary areas
          100: "#FF9001", // Highlight color
          200: "#FF8E01", // Secondary highlight color
        },
        blue:{
          DEFAULT: "#052560", // Primary blue color
          100: "#2E5DFF", // Secondary blue color
        },
        black: {
          DEFAULT: "#000000", // Absolute black
          100: "#1E1E2D", // Dark background shade
          200: "#232533", // Slightly lighter dark background shade
        },
        gray: {
          100: "#F5F5F5", // Light gray background
          200: "#E0E0E0", // Slightly darker gray for elements
        },
        background: {
          light: "#ffffff", // Light background color for the main areas
          dark: "#161622", // Dark background color for the secondary areas
        },
        text: {
          light: "#052560", // Text color
          dark: "#E0E0E0", // Dark text color for contrast on light backgrounds
        },
        accent: {
          DEFAULT: "#FF9001", // Primary accent color
          light: "#FF8E01", // Light accent color
        },
      },
    },
  },
  plugins: [],
};
