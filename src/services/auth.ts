'use server';

import {
	EMAIL_VALIDATION,
	PASSWORD_VALIDATION,
	USERNAME_VALIDATION,
} from '@/libs/constants/auth';
import { PAGE_ROUTES } from '@/libs/constants/routes';
import { getSession } from '@/libs/utils/session';
import db from '@/services/db';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkEmailIsExist = async (email: string) => {
	const user = await db.user.findUnique({
		where: { email },
		select: { id: true },
	});

	return !!user;
};

const checkEmailIsUnique = async (email: string) => {
	const user = await db.user.findUnique({
		where: { email },
		select: { id: true },
	});

	return !user;
};

const checkUsernameIsUnique = async (username: string) => {
	const user = await db.user.findUnique({
		where: { username },
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
const logInFormSchema = z.object({
	email: z
		.string({ required_error: EMAIL_VALIDATION.required })
		.email({ message: EMAIL_VALIDATION.format })
		.refine(
			checkEmailIsExist,
			'There is no account registered with this email.'
		),
	password: z.string({ required_error: PASSWORD_VALIDATION.required }),
});

const signUpFormSchema = z
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

export const signUp = async (prevState: unknown, formData: FormData) => {
	const data = {
		email: formData.get('email') || undefined,
		username: formData.get('username') || undefined,
		password: formData.get('password') || undefined,
		confirm_password: formData.get('confirm_password') || undefined,
	};

	const result = await signUpFormSchema.safeParseAsync(data);

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	const hashedPassword = await bcrypt.hash(
		result.data.password,
		process.env.BCRYPT_SALT_ROUNDS!
	);

	const createdUser = await db.user.create({
		data: {
			username: result.data.username,
			email: result.data.email,
			password: hashedPassword,
		},
		select: {
			id: true,
			username: true,
		},
	});

	const session = await getSession();

	session.id = createdUser.id;
	session.username = createdUser.username;
	await session.save();

	redirect(PAGE_ROUTES.main.path);
};

export const logIn = async (prevState: unknown, formData: FormData) => {
	const data = {
		email: formData.get('email') || undefined,
		password: formData.get('password') || undefined,
	};

	const result = await logInFormSchema.safeParseAsync(data);

	if (!result.success) {
		return { errors: result.error.flatten().fieldErrors };
	}

	const user = await db.user.findUnique({
		where: { email: result.data.email },
		select: { id: true, password: true, username: true },
	});

	const isCorrectPassword = await bcrypt.compare(
		result.data.password,
		user?.password || ''
	);

	if (!isCorrectPassword) {
		return { errors: { password: ['Wrong password.'], email: undefined } };
	}

	const session = await getSession();

	session.id = user!.id;
	session.username = user!.username;
	await session.save();

	redirect(PAGE_ROUTES.main.path);
};

export const logOut = async () => {
	const session = await getSession();

	session.destroy();
	redirect(PAGE_ROUTES.login.path);
};
