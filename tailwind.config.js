/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // If you’d like to add a brand new color to the default palette, add it in the theme.extend.colors
      colors: {
        primary: '#e11d48',   // Replace with your primary color
        secondary: '#059669' // Replace with your secondary color
      }
    }
    //If you’d like to completely delete the default color palette and replace it with your own custom colors, add your colors directly under the theme.colors
    /* colors: {
      primaryText: '#2563eb',   // Replace with your primary color
      secondaryText: '#059669' // Replace with your secondary color
    } */
  },
  plugins: []
};
