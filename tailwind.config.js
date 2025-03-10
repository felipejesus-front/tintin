/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./app/**/*.{js,jsx,ts,tsx}",
	  "./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require('nativewind/preset')],
	theme: {
	  extend: {
		colors: {
			'l-yellow': '#FFF8B0', // Light Yellow: Primary background or subtle details
			'm-blue': '#4F89B4', // Medium Blue: Highlights, titles, and buttons
			'l-blue': '#9AAED8', // Light Blue: Secondary highlights and alternative buttons
			'l-gray': '#E5E7EB', // Light Gray: Backgrounds for lists and separators
			'black': '#1A1A1A', // Black: Main text and some element backgrounds
			'red-alert': '#B24E3F'  // Brick Red: Icons, alerts, and action buttons
		  }
	  },
	},
	plugins: [],
  };
  