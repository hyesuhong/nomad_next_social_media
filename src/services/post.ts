'use server';

import db from './db';

export const getPosts = async (startIndex: number = 1) => {
	const takeCount = 2;
	const skipCount = 2 * (startIndex - 1);

	const totalLength = await db.post.count();
	const totalPageLength = Math.ceil(totalLength / takeCount);

	const posts = await db.post.findMany({
		select: {
			_count: {
				select: {
					likes: true,
				},
			},
			id: true,
			content: true,
			created_at: true,
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
		skip: skipCount,
		take: takeCount,
		orderBy: {
			created_at: 'desc',
		},
	});

	return {
		page: startIndex,
		results: posts,
		total_pages: totalPageLength,
		total_results: totalLength,
	};
};

export const getPostById = async (id: number) => {
	const post = await db.post.findFirst({
		select: {
			id: true,
			content: true,
			created_at: true,
			author: {
				select: {
					id: true,
					username: true,
				},
			},
		},
		where: {
			id,
		},
	});

	return post;
};
