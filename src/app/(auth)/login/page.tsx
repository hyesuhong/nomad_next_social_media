'use client';

import { FormButton, FormInput } from '@/components/auth-form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useActionState } from 'react';
import { handleForm } from './action';

export default function Login() {
	const [state, action] = useActionState(handleForm, null);

	return (
		<main className='h-screen flex flex-col justify-center items-center gap-y-8 bg-indigo-50'>
			<h2 className='text-xl font-bold'>Log in</h2>
			<form action={action} className='w-80 flex flex-col gap-y-6'>
				<FormInput
					label='Email'
					placeholder='email'
					name='email'
					type='email'
					defaultValue={(state?.payload.email || '') as string}
					errorMessage={state?.errors?.fieldErrors.email}
				/>
				<FormInput
					label='Username'
					placeholder='username'
					name='username'
					defaultValue={(state?.payload.username || '') as string}
					errorMessage={state?.errors?.fieldErrors.username}
				/>
				<FormInput
					label='Password'
					placeholder='password'
					name='password'
					type='password'
					defaultValue={(state?.payload.password || '') as string}
					errorMessage={state?.errors?.fieldErrors.password}
				/>

				<FormButton>Log in</FormButton>
			</form>
			{state?.status === 200 && (
				<div className='flex items-center gap-x-2 w-80 p-4 rounded-md text-sm bg-emerald-500 text-zinc-50'>
					<CheckCircleIcon className='w-6 h-6' />
					Welcome!
				</div>
			)}
		</main>
	);
}
