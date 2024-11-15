/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/*.{html,jsx}",
    "./src/components/**/*.{html,jsx}",
    "./src/components/*.{html,jsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
