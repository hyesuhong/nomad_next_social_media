import { Header } from '@/components/common';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Header />
			<main className='h-screen flex flex-col justify-center items-center gap-y-4 bg-indigo-50'>
				<Link href='/login'>Go to log in</Link>
			</main>
		</>
	);
}
