/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
		  keyframes: {
			wave: {
			  '0%': { opacity: 0 },
		
			  '100%': { opacity: 1 },
			},
		  },
		  animation: {
			'waving-hand': 'wave 5s forwards',
		  },
		},
	  },
	plugins: [
		require("tailwindcss-animation-delay"),
	],
  }