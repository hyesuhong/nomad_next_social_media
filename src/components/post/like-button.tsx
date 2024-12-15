'use client';

import { IcoHeartOutline, IcoHeartSolid } from '@/assets/icons';
import { dislikePost, likePost } from '@/services/interaction';
import { startTransition, useOptimistic } from 'react';
import { Button } from '../common';

interface LikeButtonProps {
	likeCount?: number;
	isLiked?: boolean;
	postId: number;
}

export default function LikeButton({
	likeCount = 0,
	isLiked,
	postId,
}: LikeButtonProps) {
	const [optimisticState, optimisticUpdateFn] = useOptimistic(
		{ isLiked, likeCount },
		(prevState) => ({
			isLiked: !prevState.isLiked,
			likeCount: prevState.isLiked
				? prevState.likeCount - 1
				: prevState.likeCount + 1,
		})
	);

	const handleClick = async () => {
		startTransition(() => {
			optimisticUpdateFn(null);
		});

		if (isLiked) {
			await dislikePost(postId);
		} else {
			await likePost(postId);
		}
	};

	return (
		<Button
			onClick={handleClick}
			size='small'
			level='ghost'
			className='flex items-center gap-x-1 [&_svg]:size-4'
		>
			{optimisticState.isLiked ? <IcoHeartSolid /> : <IcoHeartOutline />}
			<span>{optimisticState.likeCount}</span>
		</Button>
	);
}
