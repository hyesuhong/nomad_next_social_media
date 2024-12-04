import { AddPost, PostList } from '@/components/post';
import { getPosts } from '@/services/post';

export default async function Home() {
	const { total_results, total_pages, page, results } = await getPosts();

	return (
		<>
			<main className='min-h-screen'>
				<AddPost />
				<PostList
					totalLength={total_results}
					initialPosts={results}
					totalPages={total_pages}
					currentPage={page}
				/>
			</main>
		</>
	);
}
