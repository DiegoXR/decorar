/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // If you’d like to add a brand new color to the default palette, add it in the theme.extend.colors
      colors: {
        primary: '#302d2e',   // Replace with your primary color
        secondary: '#059669', // Replace with your secondary color
        iconColor: '#302d2e' // Replace with your secondary color
      },
      height: {
        'dynamic': 'var(--dynamic-height)',
      },
    },
    screens: {
      'xs': '390px', // Custom breakpoint for iPhones and similar devices
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    //If you’d like to completely delete the default color palette and replace it with your own custom colors, add your colors directly under the theme.colors
    /* colors: {
      primaryText: '#2563eb',   // Replace with your primary color
      secondaryText: '#059669' // Replace with your secondary color
    } */

    fontFamily:{
      'roboto': ['Roboto', 'sans-serif']
    }
  },
  plugins: []
};
