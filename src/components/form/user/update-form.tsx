'use client';

import { updateUserInfo } from '@/services/user';
import { FormEvent, startTransition, useActionState } from 'react';
import SubmitButton from '../submit-button';
import Input from './input';
import Textarea from './textarea';

interface UpdateFormProps {
	user: {
		email: string;
		username: string;
		profile: string | null;
		bio: string | null;
	};
}

export default function UpdateForm({ user }: UpdateFormProps) {
	const [state, action] = useActionState(updateUserInfo, null);

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const { currentTarget } = ev;

		const formData = new FormData(currentTarget);

		startTransition(() => {
			action(formData);
		});
	};

	return (
		<form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-6 mt-4'>
			<Input
				label='Username'
				type='text'
				name='username'
				defaultValue={user.username}
			/>
			<Input
				label='Email'
				type='email'
				name='email'
				defaultValue={user.email}
			/>
			<Textarea label='Biography' name='bio' defaultValue={user.bio || ''} />
			<Input label='Password' type='password' name='password' />
			<Input type='password' name='confirm_password' />

			<SubmitButton>Save</SubmitButton>
		</form>
	);
}
