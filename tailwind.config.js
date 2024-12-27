/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
        secondary: {
          "50": "#f5fdf4",
          "100": "#eafbea",
          "200": "#cef5cc",
          "300": "#a7e8a4",
          "400": "#70d272",
          "500": "#42b847",
          "600": "#32a337",
          "700": "#28812b",
          "800": "#1e5f20",
          "900": "#194d1a",
        },
        accent: {
          "50": "#fff7ed",
          "100": "#ffedd5",
          "200": "#fed7aa",
          "300": "#fdba74",
          "400": "#fb923c",
          "500": "#f97316",
          "600": "#ea580c",
          "700": "#c2410c",
          "800": "#9a3412",
          "900": "#7c2d12",
        },
        neutral: {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e4e4e7",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
          "500": "#71717a",
          "600": "#52525b",
          "700": "#3f3f46",
          "800": "#27272a",
          "900": "#18181b",
        },
      },
      spacing: {
        "18": "4.5rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      fontSize: {
        xxs: "0.625rem", // Extra extra small for fine print
        "4.5xl": "2.5rem", // Between 4xl and 5xl
      },
      borderRadius: {
        xl: "1rem", // Extra large rounded corners
        "2xl": "1.5rem", // Even larger
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.1)",
        intense: "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Better form styling
    require('@tailwindcss/typography'), // Enhanced typography
    require('@tailwindcss/aspect-ratio'), // Aspect ratio utilities
  ],
};
