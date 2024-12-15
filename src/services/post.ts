'use server';

import { PAGE_ROUTES } from '@/libs/constants/routes';
import { getSession } from '@/libs/utils/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import db from './db';

export const getPosts = async (startIndex: number = 1) => {
	const session = await getSession();

	if (!session.id) {
		return { errors: { auth: 'Unauthorized' } };
	}

	const takeCount = 2;
	const skipCount = 2 * (startIndex - 1);

	const totalLength = await db.post.count();
	const totalPageLength = Math.ceil(totalLength / takeCount);

	const posts = await db.post.findMany({
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
			interactions: {
				select: { user_id: true, post_id: true },
				where: {
					user_id: session.id,
					kind: {
						equals: 'LIKE',
					},
				},
			},
			_count: {
				select: {
					interactions: {
						where: {
							kind: {
								equals: 'LIKE',
							},
						},
					},
					comments: true,
				},
			},
		},
		skip: skipCount,
		take: takeCount,
		orderBy: {
			created_at: 'desc',
		},
	});

	const postsWithOwner = posts.map((data) => ({
		isOwner: data.author.id === session.id,
		...data,
	}));

	return {
		page: startIndex,
		results: postsWithOwner,
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
			_count: {
				select: {
					comments: true,
					interactions: {
						where: {
							kind: {
								equals: 'LIKE',
							},
						},
					},
				},
			},
		},
		where: {
			id,
		},
	});

	return post;
};

const postScheme = z.object({
	content: z.string({ required_error: 'Content is empty.' }),
});

export const createPost = async (prevState: unknown, formData: FormData) => {
	const session = await getSession();

	if (!session.id) {
		return { errors: { auth: 'Unauthorized' } };
	}

	const data = {
		content: formData.get('content') || undefined,
	};

	const result = postScheme.safeParse(data);

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	const newPost = await db.post.create({
		data: {
			content: result.data.content,
			author: {
				connect: {
					id: session.id,
				},
			},
		},
		select: {
			id: true,
		},
	});

	redirect(PAGE_ROUTES.post_detail.generator!(newPost.id));
};

const searchSchema = z.object({
	keyword: z.string().min(1, 'Keyword should be at least 1 character.'),
});

export const searchPostByKeyword = async (
	prevState: unknown,
	formData: FormData
) => {
	const data = {
		keyword: formData.get('keyword'),
	};

	const result = searchSchema.safeParse(data);

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	const matchedPosts = await db.post.findMany({
		where: {
			content: {
				contains: result.data.keyword,
				// mode: 'insensitive'
			},
		},
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
		orderBy: {
			created_at: 'desc',
		},
	});

	return { results: matchedPosts };
};
