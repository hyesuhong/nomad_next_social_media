import { pretendard } from '@/styles/font';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		template: '%s | Social media',
		default: 'Social media',
	},
	description: 'Social media project built with Next.js',
	icons: {
		icon: [
			{ url: '/icons/favicon.ico' },
			{ url: '/icons/favicon.svg', type: 'image/svg+xml' },
			{ url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		],
		shortcut: {
			url: '/icons/favicon-16x16.png',
			sizes: '16x16',
			type: 'image/png',
		},
		apple: {
			url: '/icons/apple-icon-180x180.png',
			sizes: '180x180',
			type: 'image/png',
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${pretendard.variable}`}>
			<body>{children}</body>
		</html>
	);
}
