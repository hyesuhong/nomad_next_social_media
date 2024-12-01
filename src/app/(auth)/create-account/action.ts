'use server';

import { z } from 'zod';

const PASSWORD_REGEXP = /([a-zA-Z]*\d+)/;

const formSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required.' })
			.min(5, 'Username should be at least 5 characters.')
			.trim()
			.toLowerCase(),
		email: z
			.string({ required_error: 'Email address is required.' })
			.email({ message: 'Invalid email format.' }),
		password: z
			.string({ required_error: 'Password is required.' })
			.min(10, 'Password should be at least 10 characters.')
			.regex(PASSWORD_REGEXP, 'Password should contain at least one number.'),
		confirm_password: z.string(),
	})
	.refine(({ password, confirm_password }) => password === confirm_password, {
		message: 'Passwords must be same.',
		path: ['confirm_password'],
	});

export async function createAccount(prevState: unknown, formData: FormData) {
	const data = {
		email: formData.get('email') || undefined,
		username: formData.get('username') || undefined,
		password: formData.get('password') || undefined,
		confirm_password: formData.get('confirm_password') || undefined,
	};

	const result = formSchema.safeParse(data);

	if (!result.success) {
		return { status: 400, errors: result.error.flatten() };
	}

	return { status: 200 };
}
