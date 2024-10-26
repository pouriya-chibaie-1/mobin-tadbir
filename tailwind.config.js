/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	  flowbite.content(),
	  "node_modules/flowbite/**/*.js"

	],
	
	theme: {
	  extend: {
		colors: {
		  'border-color': '#D3D5E5',
		  'primary-color': '#034CA0',
		  'subtitle-color': '#9AB7D9',
		  'text-color': '#000000DE',
		  'success-color': '#3B693A',
		  'error-color': '#B3261E',
		  'secondary-color': '#0D6EFD',
		  'disabled-text': 'rgba(0, 0, 0, 0.38)',
		  'disabled-color': '#DDDDDD',
		  'tooltip-bg': "#E0EAF5",
		  'tooltip-color': "rgba(0, 0, 0, 0.87)",
		  'custom-color': '#E0EAF5', // Your custom color
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"), 
	  flowbite.plugin(),

	],
  }
  