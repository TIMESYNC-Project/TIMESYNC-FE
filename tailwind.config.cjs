/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F4C75",
        sky: "#3282B8",
        bone: "#F5F5F5",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
