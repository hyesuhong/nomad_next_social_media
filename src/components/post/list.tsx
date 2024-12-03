'use client';

import { getPosts } from '@/services/post';
import { Post } from '@prisma/client';
import { useState } from 'react';
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
	initialPosts: PostForList[];
}

export default function List({ totalLength, initialPosts }: ListProps) {
	const [posts, setPosts] = useState(initialPosts);
	const [page, setPage] = useState(1);

	const onButtonClick = async () => {
		const { posts: newPosts } = await getPosts(page);
		setPosts((post) => [...post, ...newPosts]);
		setPage((prev) => prev + 1);
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
			{posts.length < totalLength && (
				<button onClick={onButtonClick}>Get more</button>
			)}
		</section>
	);
}
