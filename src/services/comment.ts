'use server';

import { getSession } from '@/libs/utils/session';
import db from '@/services/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const getComments = async (postId: number) => {
	const comments = await db.comment.findMany({
		select: {
			id: true,
			content: true,
			created_at: true,
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
		where: {
			post_id: postId,
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	return comments;
};

const commentScheme = z.object({
	content: z.string({ required_error: 'Comment is empty.' }),
	post_id: z.coerce.number(),
});

export const createComment = async (prevState: unknown, formData: FormData) => {
	const session = await getSession();

	if (!session.id) {
		return { errors: { auth: 'Unauthorized' } };
	}

	const data = {
		content: formData.get('content') || undefined,
		post_id: formData.get('post_id') || undefined,
	};

	const result = commentScheme.safeParse(data);

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	await db.comment.create({
		data: {
			content: result.data.content,
			user: {
				connect: {
					id: session.id,
				},
			},
			post: {
				connect: {
					id: result.data.post_id,
				},
			},
		},
	});

	revalidatePath(`/posts/${result.data.post_id}`);
};
