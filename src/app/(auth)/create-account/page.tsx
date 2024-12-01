'use client';

import { FormButton, FormInput, PageSwitch } from '@/components/auth-form';
import { FormEvent, startTransition, useActionState } from 'react';
import { createAccount } from './action';

export default function CreateAccount() {
	const [state, action] = useActionState(createAccount, null);

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const { currentTarget } = ev;

		const formData = new FormData(currentTarget);

		startTransition(() => {
			action(formData);
		});
	};

	return (
		<main className='h-screen flex flex-col justify-center items-center gap-y-8 bg-indigo-50'>
			<h2 className='text-xl font-bold'>Sign up</h2>
			<form onSubmit={handleSubmit} className='w-80 flex flex-col gap-y-6'>
				<FormInput
					label='Email'
					placeholder=''
					type='email'
					name='email'
					errorMessage={state?.errors?.fieldErrors.email}
				/>
				<FormInput
					label='Username'
					placeholder=''
					name='username'
					errorMessage={state?.errors?.fieldErrors.username}
				/>
				<FormInput
					label='Password'
					placeholder=''
					type='password'
					name='password'
					errorMessage={state?.errors?.fieldErrors.password}
				/>
				<FormInput
					label='Confirm password'
					placeholder=''
					type='password'
					name='confirm_password'
					errorMessage={state?.errors?.fieldErrors.confirm_password}
				/>
				<FormButton>Sign up</FormButton>
			</form>
			<hr className='w-80 border-zinc-200' />
			<PageSwitch
				message='Already have an account?'
				targetUrl={{ label: 'Log in', url: '/log-in' }}
			/>
		</main>
	);
}
