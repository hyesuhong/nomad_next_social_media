'use client';

import { createPost } from '@/services/post';
import { useActionState } from 'react';
import AddPostButton from './add-post-button';

export default function AddPost() {
	const [, action] = useActionState(createPost, null);

	return (
		<div className='max-w-xl w-full mx-auto p-4'>
			<form
				action={action}
				className='flex flex-col items-end gap-y-2 border border-zinc-300 p-2'
			>
				<textarea
					name='content'
					className='w-full h-24 bg-transparent border border-zinc-300 outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-indigo-400'
				></textarea>
				<AddPostButton />
			</form>
		</div>
	);
}
