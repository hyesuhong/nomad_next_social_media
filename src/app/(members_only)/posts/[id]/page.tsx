import { Comments } from '@/components/comment';
import { PostItem } from '@/components/post';
import { getComments } from '@/services/comment';
import { getLikeStatus } from '@/services/interaction';
import { getPostById } from '@/services/post';
import { notFound } from 'next/navigation';

interface PostDetailPage {
	params: Promise<{ id: string }>;
}

export default async function PostDetail({ params }: PostDetailPage) {
	const { id } = await params;
	const postId = +id;
	const post = await getPostById(postId);

	if (!post) {
		notFound();
	}

	const comments = await getComments(postId);
	const likeStatus = await getLikeStatus(postId);

	return (
		<>
			<section className='pt-8'>
				<PostItem
					post_id={post.id}
					content={post.content}
					created_at={post.created_at}
					author={post.author}
					isLiked={likeStatus.isLiked}
					isOwner={post.isOwner}
					_count={{
						likes: likeStatus.likeCount,
						comments: comments.length,
					}}
					hasAction
				/>
			</section>
			<section>
				<Comments postId={postId} initialComments={comments} />
			</section>
		</>
	);
}
