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
      "black-color": "text-gray-900",
      "black-color-200": "#CDCFDC",
      "blue-color": "#372D63",
      "muted-color": "#9692AC",
      "gray-color": "#AFABC0",
      "gray-color-500": "#e9e8e8",
      "danger-color": "#ff4d18",
      "info-color": "#9577FF",
      "red-color": "#ff0000",
      "pink-color": "#FD4C6F",
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
    //   60: "60%",
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
