/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.54)",
      },
      minHeight: {
        body: "calc(100vh - 71px)",
      },
    },
  },
  plugins: [],
};
