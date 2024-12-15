import { Button } from '@/components/common';
import { getSession } from '@/libs/utils/session';
import Link from 'next/link';

export default async function NotFound() {
	const session = await getSession();

	return (
		<main className='min-h-screen max-w-md w-full mx-auto flex flex-col items-center justify-center px-6'>
			<h1 className='text-6xl font-bold text-grey-light'>404</h1>
			<p className='mt-2 mb-8'>Looks like you are lost...</p>
			{session.id ? (
				<Link href='/'>
					<Button size='medium' level='ghost'>
						Go to Main
					</Button>
				</Link>
			) : (
				<Link href='/log-in'>
					<Button size='medium' level='ghost'>
						Go to Login
					</Button>
				</Link>
			)}
		</main>
	);
}
