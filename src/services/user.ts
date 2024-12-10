'use server';

import { getSession } from '@/libs/utils/session';
import { notFound } from 'next/navigation';
import db from './db';

export const getUserByUsername = async (username: string) => {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	const user = await db.user.findUnique({
		select: {
			id: true,
			username: true,
			profile: true,
			bio: true,
		},
		where: {
			username,
		},
	});

	if (!user) {
		notFound();
	}

	const isLoggedInUser = user.id === session.id;

	return { ...user, isLoggedInUser };
};
