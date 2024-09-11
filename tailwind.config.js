/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        largerScreen: "376px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Primary
        brightBlue: "hsl(220, 98%, 61%)",
        gradBlue: "hsl(192, 100%, 67%)",
        gradPurple: "hsl(280, 87%, 65%)",

        // Light Theme
        veryLightGray: "hsl(0, 0%, 98%)",
        veryLightGrayishBlue: "hsl(236, 33%, 92%)",
        lightGrayishBlueL: "hsl(233, 11%, 84%)",
        darkGrayishBlue: "hsl(236, 9%, 61%)",
        veryDarkGrayishBlue: "hsl(235, 19%, 35%)",

        // Dark Theme
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGrayishBlueD: "hsl(234, 39%, 85%)",
        hoverLightGrayishBlue: "hsl(236, 33%, 92%)",
        darkGrayishBlue: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlue1: "hsl(233, 14%, 35%)",
        veryDarkGrayishBlue2: "hsl(237, 14%, 26%)",
      },
      boxShadow: {
        '3xl': '0 35px 300px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
