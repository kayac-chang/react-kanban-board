module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      blue: "#1C5A7C",
      white: "#ffffff",
      gray: {
        fill: "#F8F8F9",
        stroke: "#E4E4E4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
