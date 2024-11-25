'use server';

import { z } from 'zod';

const formSchema = z.object({
	username: z
		.string({ required_error: 'Username is required.' })
		.trim()
		.toLowerCase(),
	email: z
		.string({ required_error: 'Email address is required.' })
		.email({ message: 'Invalid email format.' })
		.toLowerCase(),
	password: z
		.string({ required_error: 'Password is required.' })
		.regex(/(12345)/, 'Wrong password.'),
});

export async function handleForm(prevState: unknown, formData: FormData) {
	const data = {
		username: formData.get('username') || undefined,
		email: formData.get('email') || undefined,
		password: formData.get('password') || undefined,
	};

	const result = formSchema.safeParse(data);

	if (!result.success) {
		return { status: 400, errors: result.error.flatten(), payload: data };
	}

	return { status: 200, payload: data };
}
