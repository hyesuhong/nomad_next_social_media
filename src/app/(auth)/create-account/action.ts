'use server';

import {
	EMAIL_VALIDATION,
	PASSWORD_VALIDATION,
	USERNAME_VALIDATION,
} from '@/libs/constants/auth';
import { PAGE_ROUTES } from '@/libs/constants/routes';
import db from '@/services/db';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkUsernameIsUnique = async (username: string) => {
	const user = await db.user.findUnique({
		where: { username },
		select: { id: true },
	});

	return !user;
};

const checkEmailIsUnique = async (email: string) => {
	const user = await db.user.findUnique({
		where: { email },
		select: { id: true },
	});

	return !user;
};

const checkPasswordConfirmed = ({
	password,
	confirm_password,
}: {
	password: string;
	confirm_password: string;
}) => {
	return password === confirm_password;
};

const formSchema = z
	.object({
		username: z
			.string({ required_error: USERNAME_VALIDATION.required })
			.min(USERNAME_VALIDATION.min.value, USERNAME_VALIDATION.min.message)
			.trim()
			.toLowerCase()
			.refine(checkUsernameIsUnique, USERNAME_VALIDATION.unique),
		email: z
			.string({ required_error: EMAIL_VALIDATION.required })
			.email({ message: EMAIL_VALIDATION.format })
			.refine(checkEmailIsUnique, EMAIL_VALIDATION.unique),
		password: z
			.string({ required_error: PASSWORD_VALIDATION.required })
			.min(PASSWORD_VALIDATION.min.value, PASSWORD_VALIDATION.min.message)
			.regex(
				PASSWORD_VALIDATION.regexp.value,
				PASSWORD_VALIDATION.regexp.message
			),
		confirm_password: z.string({
			required_error: PASSWORD_VALIDATION.confirm.empty,
		}),
	})
	.refine(checkPasswordConfirmed, {
		message: PASSWORD_VALIDATION.confirm.not_match,
		path: ['confirm_password'],
	});

export async function createAccount(prevState: unknown, formData: FormData) {
	const data = {
		email: formData.get('email') || undefined,
		username: formData.get('username') || undefined,
		password: formData.get('password') || undefined,
		confirm_password: formData.get('confirm_password') || undefined,
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return { status: 400, errors: result.error.flatten() };
	}

	const hashedPassword = await bcrypt.hash(result.data.password, 10);
	const createdUser = await db.user.create({
		data: {
			username: result.data.username,
			email: result.data.email,
			password: hashedPassword,
		},
		select: {
			id: true,
		},
	});

	const cookieStore = await cookies();
	const cookie = await getIronSession<{ id: string }>(cookieStore, {
		cookieName: 'social_media_logged_in',
		password: process.env.COOKIE_PASSWORD!,
	});

	cookie.id = `${createdUser.id}`;
	await cookie.save();

	redirect(PAGE_ROUTES.main.path);
}
