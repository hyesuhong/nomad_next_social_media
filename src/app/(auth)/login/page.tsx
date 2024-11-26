'use client';

import { FormButton, FormInput } from '@/components/auth-form';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { ChangeEvent, useActionState, useState } from 'react';
import { handleForm } from './action';

export default function Login() {
	const [state, action] = useActionState(handleForm, null);
	const [formInput, setFormInput] = useState({
		email: '',
		username: '',
		password: '',
	});

	const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { name, value },
		} = ev;
		if (!(name in formInput)) {
			return;
		}

		setFormInput((prevInput) => ({ ...prevInput, [name]: value }));
	};

	return (
		<main className='h-screen flex flex-col justify-center items-center gap-y-8 bg-indigo-50'>
			<h2 className='text-xl font-bold'>Log in</h2>
			<Form action={action} className='w-80 flex flex-col gap-y-6'>
				<FormInput
					label='Email'
					placeholder='email'
					name='email'
					type='email'
					value={formInput.email}
					onChange={onInputChange}
					errorMessage={state?.errors?.fieldErrors.email}
				/>
				<FormInput
					label='Username'
					placeholder='username'
					name='username'
					value={formInput.username}
					onChange={onInputChange}
					errorMessage={state?.errors?.fieldErrors.username}
				/>
				<FormInput
					label='Password'
					placeholder='password'
					name='password'
					type='password'
					value={formInput.password}
					onChange={onInputChange}
					errorMessage={state?.errors?.fieldErrors.password}
				/>

				<FormButton>Log in</FormButton>
			</Form>
			{state?.status === 200 && (
				<div className='flex items-center gap-x-2 w-80 p-4 rounded-md text-sm bg-emerald-500 text-zinc-50'>
					<CheckCircleIcon className='w-6 h-6' />
					Welcome!
				</div>
			)}
		</main>
	);
}
