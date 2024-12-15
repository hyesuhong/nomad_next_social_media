'use client';

import { Button } from '@/components/common';

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className='min-h-screen max-w-md w-full mx-auto flex flex-col items-center justify-center px-6'>
			<h1 className='text-3xl font-bold text-grey-light'>
				Something went wrong!
			</h1>
			<p className='mt-2 mb-8'>{error.message}</p>
			<Button size='medium' level='ghost' onClick={() => reset()}>
				Try again
			</Button>
		</main>
	);
}
