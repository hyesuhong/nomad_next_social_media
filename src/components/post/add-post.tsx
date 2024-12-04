'use client';

import { FormEvent } from 'react';

export default function AddPost() {
	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const { currentTarget } = ev;
	};

	return (
		<div className='max-w-xl w-full mx-auto p-4'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-end gap-y-2 border border-zinc-300 p-2'
			>
				<textarea
					name='content'
					className='w-full h-24 bg-transparent border border-zinc-300 outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-indigo-400'
				></textarea>
				<button className='bg-zinc-50/50 h-8 px-8 text-sm hover:bg-indigo-300 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors'>
					Post
				</button>
			</form>
		</div>
	);
}
