import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-pretendard)'],
			},
			colors: {
				neutral: '#F2F5FF',
				grey: {
					dark: '#393939',
					light: '#9E9E9E',
					lightest: '#E3E3E3',
				},
				primary: {
					default: '#6F89DD',
					hover: '#5472D4',
					active: '#3757C0',
					disabled: '#CBCEDA',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
