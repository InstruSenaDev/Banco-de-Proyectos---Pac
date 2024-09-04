// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
        colorCarta: '#FBFCFF',
        Verde: '#A3E784',
        customGreen: 'rgba(163, 231, 132, 1)',
    },
  }
};

export const plugins = [];