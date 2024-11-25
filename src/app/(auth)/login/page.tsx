export default function Home() {
	return (
		<main className='h-screen flex flex-col justify-center items-center gap-y-4 bg-indigo-50'>
			<h2 className='text-xl font-bold'>Log in</h2>
			<form action='' className='w-80 flex flex-col gap-y-8'>
				<div className='relative'>
					<input
						type='email'
						placeholder=''
						className='peer w-full h-10 pt-3 px-1 pb-1 bg-transparent outline-none border-b border-b-zinc-300 text-sm focus:border-b-zinc-700 transition-colors'
					/>
					<label
						htmlFor=''
						className='absolute top-0 left-1 -translate-y-1/2 text-xs text-zinc-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all'
					>
						Email
					</label>
				</div>
				<div className='relative'>
					<input
						type='text'
						placeholder=''
						className='peer w-full h-10 pt-3 px-1 pb-1 bg-transparent outline-none border-b border-b-zinc-300 text-sm focus:border-b-zinc-700 transition-colors'
					/>
					<label
						htmlFor=''
						className='absolute top-0 left-1 -translate-y-1/2 text-xs text-zinc-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all'
					>
						Username
					</label>
				</div>
				<div className='relative'>
					<input
						type='password'
						placeholder=''
						className='peer w-full h-10 pt-3 px-1 pb-1 bg-transparent outline-none border-b border-b-zinc-300 text-sm focus:border-b-zinc-700 transition-colors'
					/>
					<label
						htmlFor=''
						className='absolute top-0 left-1 -translate-y-1/2 text-xs text-zinc-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all'
					>
						Password
					</label>
				</div>
				<button className='bg-zinc-700 text-zinc-50 h-10 text-sm rounded-md'>
					Log in
				</button>
			</form>
		</main>
	);
}
