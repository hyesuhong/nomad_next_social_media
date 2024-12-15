import { PAGE_ROUTES } from '@/libs/constants/routes';
import Link from 'next/link';
import { Profile } from '../common';
import CommentButton from './comment-button';
import LikeButton from './like-button';
import OwnerButton from './owner-button';

interface ItemProps {
	isOwner: boolean;
	author: {
		id: number;
		username: string;
	};
	content: string;
	created_at: Date;
	post_id: number;
	isLiked: boolean;
	_count: {
		interactions: number;
		comments: number;
	};
}

export default function Item({
	post_id,
	content,
	created_at,
	author,
	isLiked,
	_count,
	isOwner,
}: ItemProps) {
	const postDetailRoute = PAGE_ROUTES.post_detail.generator
		? PAGE_ROUTES.post_detail.generator(post_id)
		: '';

	const userDetailRoute = PAGE_ROUTES.users_detail.generator
		? PAGE_ROUTES.users_detail.generator(author.username)
		: '';

	return (
		<div className='px-6 py-4 border-t border-t-grey-lightest first:border-t-0 flex gap-x-2'>
			<Link href={userDetailRoute}>
				<Profile name={author.username} size='medium' />
			</Link>
			<div className='flex-1 pt-1 grid grid-cols-[min-content_minmax(0,_1fr)] items-center gap-x-2'>
				<h4 className='text-sm'>
					<Link href={userDetailRoute}>{author.username}</Link>
				</h4>
				<span className='text-xs text-grey-light'>
					{created_at.toDateString()}
				</span>
				<p className='col-span-2 mt-1 mb-4'>
					<Link href={postDetailRoute}>{content}</Link>
				</p>
				<div className='col-span-2 flex items-center gap-x-2'>
					<LikeButton
						postId={post_id}
						likeCount={_count.interactions}
						isLiked={isLiked}
					/>
					<CommentButton postId={post_id} count={_count.comments} />

					{isOwner && <OwnerButton />}
				</div>
			</div>
		</div>
	);
}
