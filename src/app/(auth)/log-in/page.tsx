'use client';

import { FormButton, FormInput, PageSwitch } from '@/components/auth-form';
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
				<FormInput
					label='Email'
					placeholder='email'
					name='email'
					type='email'
					errorMessage={state?.errors.email}
				/>
				<FormInput
					label='Password'
					placeholder='password'
					name='password'
					type='password'
					errorMessage={state?.errors.password}
				/>

				<FormButton>Log in</FormButton>
			</form>

			<PageSwitch
				message="Don't have an account?"
				targetUrl={{ label: 'Create account', url: '/create-account' }}
			/>
		</>
	);
}
