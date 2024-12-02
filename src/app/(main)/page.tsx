import { PostItem } from '@/components/post';
import { getPosts } from '@/services/post';

export default async function Home() {
	const posts = await getPosts();
	console.log(posts);

	return (
		<>
			<main className='min-h-screen'>
				<section className='max-w-xl w-full mx-auto px-4 py-8'>
					{posts.map((post, index) => (
						<PostItem
							key={index}
							post_id={post.id}
							created_at={post.created_at}
							content={post.content}
							author={post.author}
						/>
					))}
				</section>
			</main>
		</>
	);
}
