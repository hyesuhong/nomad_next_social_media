'use server';

import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '@/libs/constants/auth';
import { PAGE_ROUTES } from '@/libs/constants/routes';
import db from '@/services/db';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkEmailIsExist = async (email: string) => {
	const user = await db.user.findUnique({
		where: { email },
		select: { id: true },
	});

	return !!user;
};

const formSchema = z.object({
	email: z
		.string({ required_error: EMAIL_VALIDATION.required })
		.email({ message: EMAIL_VALIDATION.format })
		.refine(
			checkEmailIsExist,
			'There is no account registered with this email.'
		),
	password: z.string({ required_error: PASSWORD_VALIDATION.required }),
});

export async function handleForm(prevState: unknown, formData: FormData) {
	const data = {
		email: formData.get('email') || undefined,
		password: formData.get('password') || undefined,
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return { status: 400, errors: result.error.flatten() };
	}

	const user = await db.user.findUnique({
		where: { email: result.data.email },
		select: { id: true, password: true },
	});

	const isCorrectPassword = await bcrypt.compare(
		result.data.password,
		user?.password || ''
	);

	if (!isCorrectPassword) {
		return {
			status: 400,
			errors: {
				fieldErrors: { password: ['Wrong password.'], email: undefined },
			},
		};
	}

	const cookieStore = await cookies();
	const cookie = await getIronSession<{ id: string }>(cookieStore, {
		cookieName: 'social_media_logged_in',
		password: process.env.COOKIE_PASSWORD!,
	});

	cookie.id = `${user!.id}`;
	await cookie.save();

	redirect(PAGE_ROUTES.main.path);
}
