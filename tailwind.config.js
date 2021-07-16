module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      blue: {
        default: "#1C5A7C",
        web: "#4765B0",
      },
      white: "#ffffff",
      gray: {
        fill: "#F8F8F9",
        stroke: "#E4E4E4",
        text: "#80878F",
      },
      black: "#000000",
      brown: "#CB9647",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
