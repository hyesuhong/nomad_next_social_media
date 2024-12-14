'use server';

import {
	EMAIL_VALIDATION,
	PASSWORD_VALIDATION,
	USERNAME_VALIDATION,
} from '@/libs/constants/auth';
import { getSession } from '@/libs/utils/session';
import bcrypt from 'bcrypt';
import { notFound, redirect, RedirectType } from 'next/navigation';
import { z } from 'zod';
import {
	checkEmailIsUnique,
	checkPasswordConfirmed,
	checkUsernameIsUnique,
} from './auth';
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

export async function getLoggedInUser() {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	const user = await db.user.findUnique({
		where: { id: Number(session.id) },
		select: {
			id: true,
			username: true,
			bio: true,
			profile: true,
			email: true,
		},
	});

	return user || notFound();
}

const userInfoUpdateSchema = z
	.object({
		username: z
			.string()
			.min(USERNAME_VALIDATION.min.value, USERNAME_VALIDATION.min.message)
			.trim()
			.toLowerCase()
			.optional(),
		email: z.string().email({ message: EMAIL_VALIDATION.format }).optional(),
		bio: z.string().optional(),
		password: z.string().optional(),
		confirm_password: z
			.string()
			.min(PASSWORD_VALIDATION.min.value, PASSWORD_VALIDATION.min.message)
			.regex(
				PASSWORD_VALIDATION.regexp.value,
				PASSWORD_VALIDATION.regexp.message
			)
			.optional(),
	})
	.superRefine(async ({ username }, ctx) => {
		if (!username) {
			return;
		}

		const isUnique = await checkUsernameIsUnique(username);
		if (!isUnique) {
			ctx.addIssue({
				code: 'custom',
				message: USERNAME_VALIDATION.unique,
				path: ['username'],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.superRefine(async ({ email }, ctx) => {
		if (!email) {
			return;
		}

		const isUnique = await checkEmailIsUnique(email);
		if (!isUnique) {
			ctx.addIssue({
				code: 'custom',
				message: EMAIL_VALIDATION.unique,
				path: ['email'],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.superRefine(async ({ password, confirm_password }, ctx) => {
		if (password && confirm_password) {
			const isMatch = await checkPasswordConfirmed({
				password,
				confirm_password,
			});

			if (!isMatch) {
				ctx.addIssue({
					code: 'custom',
					message: PASSWORD_VALIDATION.confirm.not_match,
					path: ['password'],
					fatal: true,
				});
				return z.NEVER;
			}
		} else if (password || confirm_password) {
			ctx.addIssue({
				code: 'custom',
				message:
					'If you want to change password, fill both input(password, confirmed password).',
				path: ['password'],
				fatal: true,
			});
			return z.NEVER;
		}
	});

export async function updateUserInfo(prevState: unknown, formData: FormData) {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	const loggedInUser = await getLoggedInUser();

	const data = {
		username: formData.get('username') || undefined,
		email: formData.get('email') || undefined,
		bio: formData.get('bio') || undefined,
		password: formData.get('password') || undefined,
		confirm_password: formData.get('confirm_password') || undefined,
	};

	if (data.username === loggedInUser.username) {
		data.username = undefined;
	}

	if (data.email === loggedInUser.email) {
		data.email = undefined;
	}

	const result = await userInfoUpdateSchema.safeParseAsync(data);

	if (!result.success) {
		console.log(result.error?.flatten().fieldErrors);
		return { errors: result.error.flatten().fieldErrors };
	}

	if (result.data.password) {
		const hashedPassword = await bcrypt.hash(
			result.data.password,
			Number(process.env.BCRYPT_SALT_ROUNDS!)
		);

		result.data.password = hashedPassword;
		result.data.confirm_password = undefined;
	}

	const updateData = Object.entries(result.data).reduce<Record<string, string>>(
		(acc, [key, value]) => {
			if (value) {
				acc[key] = value;
			}
			return acc;
		},
		{}
	);

	const updatedUser = await db.user.update({
		data: updateData,
		where: {
			id: loggedInUser.id,
		},
		select: {
			id: true,
			email: true,
			username: true,
		},
	});

	redirect(`/users/${updatedUser.username}/edit`, RedirectType.replace);
}
