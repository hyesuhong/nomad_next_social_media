'use client';

import { FormButton, FormInput, PageSwitch } from '@/components/auth-form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { FormEvent, startTransition, useActionState } from 'react';
import { handleForm } from './action';

export default function Login() {
	const [state, action] = useActionState(handleForm, null);

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
			<h2 className='text-xl font-bold'>Log in</h2>
			<form onSubmit={handleSubmit} className='w-80 flex flex-col gap-y-6'>
				<FormInput
					label='Email'
					placeholder='email'
					name='email'
					type='email'
					errorMessage={state?.errors?.fieldErrors.email}
				/>
				<FormInput
					label='Username'
					placeholder='username'
					name='username'
					errorMessage={state?.errors?.fieldErrors.username}
				/>
				<FormInput
					label='Password'
					placeholder='password'
					name='password'
					type='password'
					errorMessage={state?.errors?.fieldErrors.password}
				/>

				<FormButton>Log in</FormButton>
			</form>
			<hr className='w-80 border-zinc-200' />
			<PageSwitch
				message="Don't have an account?"
				targetUrl={{ label: 'Create account', url: '/create-account' }}
			/>
			{state?.status === 200 && (
				<div className='flex items-center gap-x-2 w-80 p-4 rounded-md text-sm bg-emerald-500 text-zinc-50 animate-[fade-in_0.3s_ease-in-out]'>
					<CheckCircleIcon className='w-6 h-6' />
					Welcome!
				</div>
			)}
		</main>
	);
}
