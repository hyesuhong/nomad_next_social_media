import { PostCreateForm } from '@/components/form';
import { PostList } from '@/components/post';
import { getPosts } from '@/services/post';

export default async function Home() {
	const { total_results, total_pages, page, results } = await getPosts();

	return (
		<>
			<PostCreateForm />
			{results && (
				<PostList
					totalLength={total_results}
					initialPosts={results}
					totalPages={total_pages}
					currentPage={page}
				/>
			)}
		</>
	);
}
