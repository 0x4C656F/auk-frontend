/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'sans-serif': 'dosis, Sora Variable, sans-serif',
				serif: 'noto serif, Noto Serif Variable, serif',
				sans: 'noto sans, Noto Sans Georgian Variable, sans',
				heading: 'Playfair Display Variable, serif'
			},
			colors: {
				primary: '#d01822',
				text: '#1B0809',
				'text-light': '#FBFBFE',
				secondary: '#EFDADA',
				background: '#FBF8ED',
				'text-muted': '#646464',

				accent: '#7DCBB2'
			},
			fontSize: {
				'scalable-lg': '0.9vw',
				'scalable-xl': '1.6vw'
			}
		}
	},
	plugins: []
};
