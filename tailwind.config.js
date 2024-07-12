/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'sans-serif': 'dosis, Sora Variable, sans-serif',
				serif: 'noto serif, Noto Serif Variable, serif',
				sans: 'noto sans, Noto Sans Georgian Variable, sans'
			},
			colors: {
				primary: '#d01822',
				text: '#1B0809',
				secondary: '#f6f6f6',
				background: '#F4EFEF'
			},
			fontSize: {
				'scalable-lg': '0.9vw',
				'scalable-xl': '1.6vw'
			}
		}
	},
	plugins: []
};
