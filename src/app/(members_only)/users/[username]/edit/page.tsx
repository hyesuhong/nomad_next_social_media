export default function UserEdit() {
	return (
		<main>
			<section className='max-w-xl w-full mx-auto'>
				<h2 className='text-lg font-medium'>Account Information Edit</h2>
				<form action='' className='flex flex-col gap-y-4 mt-4'>
					<div className='flex items-center justify-center p-2'>
						<label
							htmlFor='profile_image'
							className='w-32 h-32 rounded-full overflow-hidden bg-zinc-50 cursor-pointer'
						/>
						<input
							type='file'
							name='profile'
							id='profile_image'
							className='hidden'
						/>
					</div>
					<div className='flex flex-col gap-y-2'>
						<p>Email</p>
						<input type='email' name='email' className='h-10 px-2' />
					</div>
					<div className='flex flex-col gap-y-2'>
						<p>Biography</p>
						<textarea
							name='bio'
							className='w-full h-24 p-2 resize-none overflow-x-hidden overflow-y-auto'
						></textarea>
					</div>
					<div className='flex flex-col gap-y-2'>
						<p>Password</p>
						<input type='password' name='password' className='h-10 px-2' />
						<input
							type='password'
							name='password_confirm'
							className='h-10 px-2'
						/>
					</div>
					<button type='submit'>Save</button>
				</form>
			</section>
		</main>
	);
}
