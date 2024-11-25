import { FormButton, FormInput } from '@/components/auth-form';

export default function Home() {
	return (
		<main className='h-screen flex flex-col justify-center items-center gap-y-4 bg-indigo-50'>
			<h2 className='text-xl font-bold'>Log in</h2>
			<form action='' className='w-80 flex flex-col gap-y-8'>
				<FormInput label='Email' placeholder='email' />
				<FormInput label='Username' placeholder='username' />
				<FormInput label='Password' placeholder='password' type='password' />

				<FormButton disabled={true}>Log in</FormButton>
			</form>
		</main>
	);
}
