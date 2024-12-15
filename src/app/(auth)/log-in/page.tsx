'use client';

import { AuthInput, AuthPageSwitch, SubmitButton } from '@/components/form';
import { logIn } from '@/services/auth';
import { FormEvent, startTransition, useActionState } from 'react';

export default function Login() {
	const [state, action] = useActionState(logIn, null);

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const { currentTarget } = ev;
		const formData = new FormData(currentTarget);

		startTransition(() => {
			action(formData);
		});
	};

	return (
		<>
			<h2 className='text-xl font-bold mb-2'>Log in</h2>
			<form
				onSubmit={handleSubmit}
				className='w-full flex flex-col gap-y-6 [&_button]:mt-4'
			>
				<AuthInput
					label='Email'
					placeholder='email'
					name='email'
					type='email'
					errorMessage={state?.errors.email}
				/>
				<AuthInput
					label='Password'
					placeholder='password'
					name='password'
					type='password'
					errorMessage={state?.errors.password}
				/>

				<SubmitButton>Log in</SubmitButton>
			</form>

			<AuthPageSwitch
				message="Don't have an account?"
				targetUrl={{ label: 'Create account', url: '/create-account' }}
			/>
		</>
	);
}
