module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'Roboto':['Roboto Slab', 'serif'],
        'Manrope': ['Manrope', 'Roboto Slab'],
        'Condensed': ['Roboto', 'Condensed']
      },
      screens:{
        sm:{'min':'320px', 'max':'734px'},
        md:{'min':'735px', 'max':'1068px'},
        lg:{'min': '1069px'}, 
        xl:{'min': '1600px'}
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')
  ],
}