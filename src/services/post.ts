'use server';

import db from './db';

export const getPosts = async () => {
	const posts = await db.post.findMany({
		select: {
			id: true,
			content: true,
			author: {
				select: {
					id: true,
					username: true,
				},
			},
			created_at: true,
		},
		take: 2,
		orderBy: {
			created_at: 'desc',
		},
	});

	return posts;
};
