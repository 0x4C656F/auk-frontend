/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['fantasy']
	},
	theme: {
		extend: {
			fontFamily: {
				'sans-serif': 'dosis, Sora Variable, sans-serif',
				serif: 'noto serif, Noto Serif Variable, serif',
				sans: 'noto sans, Noto Sans Georgian Variable, sans',
				heading: 'Playfair Display Variable, serif'
			},

			fontSize: {
				'scalable-lg': '0.9vw',
				'scalable-xl': '1.6vw'
			}
		}
	},
	plugins: [daisyui]
};
