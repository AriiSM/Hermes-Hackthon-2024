/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        main: '#9DEF5F',
        mainAccent: '#77cc37', // not needed for shadcn components
        overlay: 'rgba(0,0,0,0.8)', // background color overlay for alert dialogs, modals, etc.
  
        // light mode
        bg: '#E0E7F1',
        text: '#000',
        border: '#000',
  
        // dark mode
        darkBg: '#2c312b',
        darkText: '#eeefe9',
        darkBorder: '#000',
        secondaryBlack: '#212121', // opposite of plain white, not used pitch black because borders and box-shadows are that color 
      },
      borderRadius: {
        base: '0px'
      },
      boxShadow: {
        light: '4px 4px 0px 0px #000',
        dark: '4px 4px 0px 0px #000',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '4px',
        reverseBoxShadowX: '-4px',
        reverseBoxShadowY: '-4px',
      },
      fontWeight: {
        base: '400',
        heading: '800',
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
        addBase({
            '.scrollbar': {
                overflowY: 'auto',
                scrollbarColor: `${theme('colors.gray.500')} ${theme('colors.black')}`,
                scrollbarWidth: 'thin',
            },
            '.scrollbar::-webkit-scrollbar': {
                height: '2px',
                width: '2px',
            },
            '.scrollbar::-webkit-scrollbar-thumb': {
                backgroundColor: theme('colors.gray.300'),
            },
            '.scrollbar::-webkit-scrollbar-track-piece': {
                backgroundColor: theme('colors.gray.600'),
            },
        });
    }),
],
}



