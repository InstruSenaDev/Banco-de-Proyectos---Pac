/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		translate: {
		  '1.25': '-5px', // Define el valor de -5px para translateY
		},
		colors: {
		  'custom-green': 'rgba(163, 231, 132, 1)', // Define el color personalizado
		},

	  },
	},
	variants: {
	  extend: {
		translate: ['focus'], // Habilita el uso de translate en el estado focus
	  },
	},
	plugins: [],
  }
  