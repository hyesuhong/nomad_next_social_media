'use client';

import { FormButton, FormInput, PageSwitch } from '@/components/auth-form';
import { signUp } from '@/services/auth';
import { FormEvent, startTransition, useActionState } from 'react';

export default function CreateAccount() {
	const [state, action] = useActionState(signUp, null);

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
			<h2 className='text-xl font-bold'>Sign up</h2>
			<form onSubmit={handleSubmit} className='w-80 flex flex-col gap-y-6'>
				<FormInput
					label='Email'
					placeholder=''
					type='email'
					name='email'
					errorMessage={state?.errors.email}
				/>
				<FormInput
					label='Username'
					placeholder=''
					name='username'
					errorMessage={state?.errors.username}
				/>
				<FormInput
					label='Password'
					placeholder=''
					type='password'
					name='password'
					errorMessage={state?.errors.password}
				/>
				<FormInput
					label='Confirm password'
					placeholder=''
					type='password'
					name='confirm_password'
					errorMessage={state?.errors.confirm_password}
				/>
				<FormButton>Sign up</FormButton>
			</form>

			<PageSwitch
				message='Already have an account?'
				targetUrl={{ label: 'Log in', url: '/log-in' }}
			/>
		</>
	);
}
