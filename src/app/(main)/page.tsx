import { Header } from '@/components/common';

export default function Home() {
	return (
		<>
			<Header />
			<main className='h-screen flex flex-col justify-center items-center gap-y-4 bg-indigo-50'>
				<p>main</p>
			</main>
		</>
	);
}
