import { Header } from '@/components/common';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
