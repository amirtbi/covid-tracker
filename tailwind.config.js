module.exports = {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    // screens:{
    //   'sm':'500px',
      
    // },
    colors:{
      transparent:'transparent',
      current: 'currentColor',
      'primary':'#503caa',
      'secondary':'#FFFFFF',
      'white':'white',
      'darkgray':'#a9a9a9',
      'darkblue':'#6f73ca',
      'green':'#09dc36',
      'red':'#f44336',
      'gray':'#f1efef',
      'purple': '#4c1d95',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'blue-600':'rgb(240 253 250)',
      'Cyan':'#67e8f9',
      'slate-500':'rgb(120 113 108)',
      'dark-blue-200':'#6f6f8e'

    },
    FontFamily:{
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      Roboto:['Roboto','sans-serif']
    },
    maxWidth:{
      '1/2':'50%',
      '1/3':'30%'
    },
    width:{
      '100':'32rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
