'use server';

import { PAGE_ROUTES } from '@/libs/constants/routes';
import { getSession } from '@/libs/utils/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import db from './db';

export const getPosts = async (startIndex: number = 1) => {
	const session = await getSession();

	if (!session.id) {
		throw new Error('Unauthorized');
	}

	const takeCount = 10;
	const skipCount = 10 * (startIndex - 1);

	const totalLength = await db.post.count();

	if (totalLength < 1) {
		return {
			page: startIndex,
			results: [],
			total_pages: 1,
			total_results: totalLength,
		};
	}

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
			likes: {
				where: {
					user_id: {
						equals: session.id,
					},
				},
				select: { created_at: true },
			},
			_count: {
				select: {
					likes: true,
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
	const session = await getSession();

	if (!session.id) {
		return null;
	}

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
					likes: true,
				},
			},
		},
		where: {
			id,
		},
	});

	if (!post) {
		return post;
	}

	const postWithOwner = { isOwner: session.id === post.author.id, ...post };

	return postWithOwner;
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

	const session = await getSession();

	if (!session.id) {
		return { errors: { auth: 'Unauthorized' } };
	}

	const matchedPosts = await db.post.findMany({
		where: {
			content: {
				contains: result.data.keyword,
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
			likes: {
				where: {
					user_id: {
						equals: session.id,
					},
				},
				select: { created_at: true },
			},
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	return { results: matchedPosts };
};

export const getPostsByUserId = async (userId: number) => {
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
			_count: {
				select: {
					likes: true,
					comments: true,
				},
			},
		},
		where: {
			author_id: userId,
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	return posts;
};
