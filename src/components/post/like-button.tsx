'use client';

import { IcoHeartOutline, IcoHeartSolid } from '@/assets/icons';
import { dislikePost, likePost } from '@/services/interaction';
import { startTransition, useOptimistic } from 'react';

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
		<button
			onClick={handleClick}
			className={`flex items-center gap-x-1 h-8 px-2 text-sm ${isLiked ? 'text-red-400' : 'text-zinc-500 hover:text-red-400'} transition-colors [&_svg]:w-4 [&_svg]:h-4`}
		>
			{optimisticState.isLiked ? <IcoHeartSolid /> : <IcoHeartOutline />}
			<span>{optimisticState.likeCount}</span>
		</button>
	);
}
