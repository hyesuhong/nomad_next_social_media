'use server';

import { z } from 'zod';

const EMAIL_REGEXP = /(@zod.com)$/;
const PASSWORD_REGEXP = /([a-zA-Z]*\d+)/;

const formSchema = z.object({
	username: z
		.string({ required_error: 'Username is required.' })
		.min(5, 'Username should be at least 5 characters.')
		.trim()
		.toLowerCase(),
	email: z
		.string({ required_error: 'Email address is required.' })
		.email({ message: 'Invalid email format.' })
		.refine(
			(arg) => arg.match(EMAIL_REGEXP),
			'Only @zod.com emails are allowed.'
		),
	password: z
		.string({ required_error: 'Password is required.' })
		.min(10, 'Password should be at least 10 characters.')
		.regex(PASSWORD_REGEXP, 'Password should contain at least one number.'),
});

export async function handleForm(prevState: unknown, formData: FormData) {
	const data = {
		username: formData.get('username') || undefined,
		email: formData.get('email') || undefined,
		password: formData.get('password') || undefined,
	};

	const result = formSchema.safeParse(data);

	if (!result.success) {
		return { status: 400, errors: result.error.flatten() };
	}

	return { status: 200 };
}
