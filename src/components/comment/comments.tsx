'use client';

import { createComment } from '@/services/comment';
import { Comment } from '@prisma/client';
import { useOptimistic } from 'react';
import Form from './form';
import Item from './item';

type CommentForList = Omit<Comment, 'user_id' | 'post_id' | 'updated_at'> & {
	user: { id: number; username: string };
};

interface CommentsProps {
	postId: number;
	initialComments: CommentForList[];
}

export default function Comments({ postId, initialComments }: CommentsProps) {
	const [optimisticComments, addOptimisticComment] = useOptimistic(
		initialComments,
		(prevComments, payload: CommentForList) => [payload, ...prevComments]
	);

	const commentAction = async (prevState: unknown, formData: FormData) => {
		const commentContent = formData.get('content');
		if (!commentContent) {
			return;
		}

		const newComment: CommentForList = {
			id: -1,
			content: `${commentContent}`,
			created_at: new Date(),
			user: {
				id: -1,
				username: '...',
			},
		};
		addOptimisticComment(newComment);
		await createComment(null, formData);
	};

	return (
		<>
			<article>
				<Form postId={postId} commentAction={commentAction} />
			</article>

			{optimisticComments.length > 0 && (
				<article className='pt-4 pb-20'>
					{optimisticComments.map((comment) => (
						<Item
							key={comment.id}
							userId={comment.user.id}
							username={comment.user.username}
							createdAt={comment.created_at}
							comment={comment.content}
						/>
					))}
				</article>
			)}
		</>
	);
}
