module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    colors: {
      transparent: "transparent",
      "primary-color": "#6236FF",
      "background-color": "rgb(228 228 231)",
      "white-color": "#FEFDFF",
      "blue-color": "#231A55",
      "muted-color": "#9692AC",
    },
    FontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      Roboto: ["Roboto", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    maxWidth: {
      "1/2": "50%",
      "1/3": "30%",
      "1/5": "20%",
    },
    // width: {
    //   100: "100%",
    //   20: "22rem",
    //   30: "30rem",
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
