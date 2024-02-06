/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "0.75rem" }],
      },
    },
  },
  plugins: [],
};
