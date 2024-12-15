'use client';

import {
	IntersectionHandler,
	useIntersection,
} from '@/libs/hooks/use-intersection';
import { getPosts } from '@/services/post';
import { Post } from '@prisma/client';
import { useState } from 'react';
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
	totalPages,
	currentPage,
}: ListProps) {
	const [posts, setPosts] = useState(initialPosts);
	const [page, setPage] = useState(currentPage);

	const getNextPage = async (page: number) => {
		const targetPage = page + 1;
		const { results, page: nextPage } = await getPosts(targetPage);

		if (results) {
			setPosts((posts) => [...posts, ...results]);
			setPage(nextPage);
		}
	};

	const callbackIntersection: IntersectionHandler = ([entry], observer) => {
		const { isIntersecting, target } = entry;
		if (isIntersecting) {
			observer.unobserve(target);
			getNextPage(page);
		}
	};

	const ref = useIntersection<HTMLDivElement>({
		callbackIntersection,
	});

	return (
		<section className='pt-4 pb-20'>
			{posts.length > 0 ? (
				posts.map(({ id, interactions, ...rest }) => (
					<Item
						key={id}
						post_id={id}
						isLiked={interactions.length > 0}
						{...rest}
					/>
				))
			) : (
				<p className='text-xs text-grey-light px-6 text-center'>
					There are no posts.
				</p>
			)}
			{page !== totalPages && <div ref={ref} style={{ height: 50 }}></div>}
		</section>
	);
}
