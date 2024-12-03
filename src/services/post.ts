'use server';

import db from './db';

export const getPosts = async (startIndex: number = 0) => {
	const takeCount = 2;
	const skipCount = 2 * startIndex;

	const posts = await db.post.findMany({
		select: {
			_count: true,
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

	if (!startIndex) {
		const totalLength = await db.post.count();

		return { length: totalLength, posts };
	}

	return { posts };
};
