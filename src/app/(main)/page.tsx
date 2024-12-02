import { PostItem } from '@/components/post';

const dummyItems = new Array(20).fill(0);

export default function Home() {
	return (
		<>
			<main className='min-h-screen'>
				<section className='max-w-xl w-full mx-auto px-4 py-8'>
					{dummyItems.map((_, index) => (
						<PostItem key={index} />
					))}
				</section>
			</main>
		</>
	);
}
