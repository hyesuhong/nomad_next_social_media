'use server';

import { getSession } from '@/libs/utils/session';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import db from './db';

export const getLikeStatus = async (postId: number) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	const isLiked = await db.like.findUnique({
		where: {
			user_id_post_id: {
				user_id: session.id,
				post_id: postId,
			},
		},
	});

	const likeCount = await db.like.count({
		where: {
			post_id: postId,
		},
	});

	return { likeCount, isLiked: !!isLiked };
};

export const likePost = async (postId: number) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	await db.like.create({
		data: {
			post_id: postId,
			user_id: session.id,
		},
	});

	revalidatePath(`/posts/${postId}`);
};

export const dislikePost = async (postId: number) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	await db.like.delete({
		where: {
			user_id_post_id: {
				post_id: postId,
				user_id: session.id,
			},
		},
	});

	revalidatePath(`/posts/${postId}`);
};
