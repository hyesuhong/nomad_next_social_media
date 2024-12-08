'use client';

import { createComment } from '@/services/comment';
import { FormEvent, startTransition, useActionState } from 'react';
import SubmitButton from './submit-button';

interface FormProps {
	postId: number;
}

export default function Form({ postId }: FormProps) {
	const [state, action] = useActionState(createComment, null);

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const { currentTarget } = ev;
		const formData = new FormData(currentTarget);

		startTransition(() => {
			action(formData);
		});
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-end gap-y-2 border border-zinc-300 p-2'
		>
			<textarea
				name='content'
				className='w-full h-24 bg-transparent border border-zinc-300 outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-indigo-400'
			></textarea>
			<input type='hidden' name='post_id' value={postId} />
			<div className='flex justify-end items-center gap-x-2'>
				{state?.errors && 'content' in state.errors && (
					<p className='text-xs text-red-500'>
						{state.errors.content?.map((err, index) => (
							<span key={index}>{err}</span>
						))}
					</p>
				)}
				<SubmitButton />
			</div>
		</form>
	);
}
