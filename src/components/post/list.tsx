'use client';

import { getPosts } from '@/services/post';
import { Post } from '@prisma/client';
import { MouseEvent, useState } from 'react';
import Item from './item';

interface PostForList
	extends Omit<Post, 'updated_at' | 'author' | 'author_id'> {
	author: {
		id: number;
		username: string;
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
	totalLength,
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

		setPosts(results);
		setPage(page);
	};

	return (
		<section className='max-w-xl w-full mx-auto px-4 py-8'>
			{posts.map(({ id, created_at, content, author }) => (
				<Item
					key={id}
					post_id={id}
					created_at={created_at}
					content={content}
					author={author}
				/>
			))}
			<div className='flex justify-center items-center gap-x-4'>
				{paginations.map((pagination) => (
					<button
						key={pagination}
						data-page={pagination}
						className={`w-6 h-6 text-zinc-400 text-xs font-medium ${pagination === page ? 'text-indigo-500' : 'hover:text-zinc-700'} transition-colors`}
						onClick={onButtonClick}
					>
						{pagination}
					</button>
				))}
			</div>
		</section>
	);
}
