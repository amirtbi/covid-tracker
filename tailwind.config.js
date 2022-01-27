module.exports = {
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
      'slate-500':'rgb(120 113 108)'

    },
    FontFamily:{
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    maxWidth:{
      '1/2':'50%',
      '1/3':'30%'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
