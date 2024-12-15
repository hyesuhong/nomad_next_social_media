'use client';

import { getPosts } from '@/services/post';
import { Post } from '@prisma/client';
import { MouseEvent, useState } from 'react';
import Item from './item';

interface PostForList
	extends Omit<Post, 'updated_at' | 'author' | 'author_id'> {
	isOwner: boolean;
	author: {
		id: number;
		username: string;
	};
	interactions: { user_id: number; post_id: number }[];
	_count: {
		interactions: number;
		comments: number;
	};
}

interface ListProps {
	totalLength: number;
	totalPages: number;
	currentPage: number;
	initialPosts: PostForList[];
}

export default function List({
	initialPosts,
	// totalLength,
	totalPages,
	currentPage,
}: ListProps) {
	const [posts, setPosts] = useState(initialPosts);
	const [page, setPage] = useState(currentPage);

	const paginations = new Array(totalPages)
		.fill(0)
		.map((_, index) => index + 1);

	const onButtonClick = async (ev: MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { dataset },
		} = ev;

		const targetPage = Number(dataset.page || 1);
		const { results, page } = await getPosts(targetPage);

		if (results) {
			setPosts(results);
			setPage(page);
		}
	};

	return (
		<section className='max-w-xl w-full mx-auto px-4 py-8'>
			{posts.map(({ id, ...rest }) => (
				<Item key={id} post_id={id} {...rest} />
			))}
			<div className='flex justify-center items-center gap-x-4'>
				{paginations.map((pagination) => (
					<button
						key={pagination}
						data-page={pagination}
						className={`w-6 h-6 text-xs ${pagination === page ? 'text-indigo-500 font-medium' : 'text-zinc-400 hover:text-zinc-700'} transition-colors`}
						onClick={onButtonClick}
					>
						{pagination}
					</button>
				))}
			</div>
		</section>
	);
}
