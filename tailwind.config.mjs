/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // o 'media'
	theme: {
	  extend: {
		colors: {
		  'Color_carta': '#FBFCFF',
		  'custom-green': 'rgba(163, 231, 132, 1)',
		},
	  },
	},
	plugins: [],
  }