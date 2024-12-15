import { TabBar } from '@/components/common';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<>
			<main className='min-h-screen max-w-md w-full mx-auto'>{children}</main>
			<TabBar />
		</>
	);
}
