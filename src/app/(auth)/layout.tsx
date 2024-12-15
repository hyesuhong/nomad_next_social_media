import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<main className='max-w-sm w-full h-screen mx-auto flex flex-col items-center gap-y-8 pt-28 px-6 pb-10'>
			{children}
		</main>
	);
}
