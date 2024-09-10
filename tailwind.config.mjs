/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'blueF': '#071739',
				'WhiteF': '#F2F2F7',
				'info': '#FF9500',
				'light-blue': '#1E96F0',
			},
		},
	},
	plugins: [],
}
