'use client';

import { updateUserInfo } from '@/services/user';
import { FormEvent, startTransition, useActionState } from 'react';

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
		<form onSubmit={handleSubmit} className='flex flex-col gap-y-4 mt-4'>
			<div className='flex flex-col gap-y-2'>
				<p>Username</p>
				<input
					type='text'
					name='username'
					defaultValue={user.username}
					className='h-10 px-2'
				/>
			</div>
			<div className='flex flex-col gap-y-2'>
				<p>Email</p>
				<input
					type='email'
					name='email'
					defaultValue={user.email}
					className='h-10 px-2'
				/>
			</div>
			<div className='flex flex-col gap-y-2'>
				<p>Biography</p>
				<textarea
					name='bio'
					defaultValue={user.bio || ''}
					className='w-full h-24 p-2 resize-none overflow-x-hidden overflow-y-auto'
				></textarea>
			</div>
			<div className='flex flex-col gap-y-2'>
				<p>Password</p>
				<input type='password' name='password' className='h-10 px-2' />
				<input type='password' name='confirm_password' className='h-10 px-2' />
			</div>
			<button type='submit' className='w-24 h-10 bg-zinc-50 self-center'>
				Save
			</button>
		</form>
	);
}
