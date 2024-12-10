'use client';

import { createComment } from '@/services/comment';
import { Comment } from '@prisma/client';
import Image from 'next/image';
import { useOptimistic } from 'react';
import sampleProfile from '../../../public/sample_profile.jpeg';
import Form from './form';

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
			<Form postId={postId} commentAction={commentAction} />

			{optimisticComments.length > 0 && (
				<div className='border border-zinc-300'>
					{optimisticComments.map((comment) => (
						<dl className='flex gap-x-4 p-2' key={comment.id}>
							<dt>
								<div className='w-12 h-12 overflow-hidden rounded-full '>
									<Image src={sampleProfile} alt='' width={50} height={50} />
								</div>
							</dt>
							<dd>
								<h4>{comment.user.username}</h4>
								<p>{comment.content}</p>
							</dd>
						</dl>
					))}
				</div>
			)}
		</>
	);
}