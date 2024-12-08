import { Comment } from '@prisma/client';
import Image from 'next/image';
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
	return (
		<>
			<Form postId={postId} />

			{initialComments.length > 0 && (
				<div className='border border-zinc-300'>
					{initialComments.map((comment) => (
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
