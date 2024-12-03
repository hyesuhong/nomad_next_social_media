import { PostList } from '@/components/post';
import { getPosts } from '@/services/post';

export default async function Home() {
	const { length, posts } = await getPosts();

	return (
		<>
			<main className='min-h-screen'>
				<PostList totalLength={length || 0} initialPosts={posts} />
			</main>
		</>
	);
}
