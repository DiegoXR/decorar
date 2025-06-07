/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}', // Tu configuración
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}' , // Configuración de Flowbite
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}" // Configuración de Flowbite Icons
  ],
  darkMode: 'selector', // Configuración de Flowbite
  theme: {
    extend: {
      // Colores personalizados de tu configuración
      colors: {
        primary: '#302d2e', // Tu color primario
        secondary: '#059669', // Tu color secundario
        iconColor: '#302d2e', // Tu color de iconos
        // Colores adicionales de Flowbite
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      },
      height: {
        'dynamic': 'var(--dynamic-height)', // Tu configuración de altura
      },
      // Puedes agregar más propiedades si lo necesitas
    },
    // Tus breakpoints personalizados
    screens: {
      'sm': '640px',      // Mobile Portrait
      'md': '745px',      // Mobile Landscape. 750px instead of 768px becase iphone Landscape is 750px
      'lg': '1024px',      // Tablet Portrait
      'xl': '1280px',     // Tablet Landscape
      '2xl': '1536px',    // Desktop
    },
    fontFamily: {

        roboto: ['Roboto', 'sans-serif'],     // Existing Roboto font
        poppins: ['Poppins', 'sans-serif'],   // Add Poppins font
        // sans: ['Poppins', 'sans-serif'],      // Optional: Set Poppins as the default `font-sans`
    }
  },
  plugins: [
    flowbitePlugin // Plugin de Flowbite
  ]
};
