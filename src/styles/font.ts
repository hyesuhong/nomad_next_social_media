import localFont from 'next/font/local';

export const pretendard = localFont({
	src: '../assets/fonts/pretendard/variable/PretendardVariable.woff2',
	display: 'swap',
	weight: '100 900',
	preload: true,
	variable: '--font-pretendard',
});
