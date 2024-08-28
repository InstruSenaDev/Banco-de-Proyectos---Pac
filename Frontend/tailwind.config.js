/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Asegúrate de que esta línea esté presente
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
