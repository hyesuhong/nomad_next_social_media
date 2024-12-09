'use server';

import { getSession } from '@/libs/utils/session';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import db from './db';

const INTERACTION_KIND = {
	like: 'LIKE',
};

export const getLikeStatus = async (postId: number) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	const isLiked = await db.interaction.findUnique({
		where: {
			user_id_post_id_kind: {
				post_id: postId,
				user_id: session.id,
				kind: INTERACTION_KIND.like,
			},
		},
	});
	const likeCount = await db.interaction.count({
		where: {
			post_id: postId,
			kind: INTERACTION_KIND.like,
		},
	});

	return { likeCount, isLiked: !!isLiked };
};

export const likePost = async (postId: number) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	await db.interaction.create({
		data: {
			post_id: postId,
			user_id: session.id,
			kind: INTERACTION_KIND.like,
		},
	});

	revalidatePath(`/posts/${postId}`);
};

export const dislikePost = async (postId: number) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	await db.interaction.delete({
		where: {
			user_id_post_id_kind: {
				post_id: postId,
				user_id: session.id,
				kind: INTERACTION_KIND.like,
			},
		},
	});

	revalidatePath(`/posts/${postId}`);
};
