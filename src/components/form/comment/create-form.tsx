'use client';

import { useActionState } from 'react';
import SubmitButton from '../submit-button';

interface FormProps {
	postId: number;
	commentAction: (prevState: unknown, formData: FormData) => Promise<void>;
}

export default function CreateForm({ postId, commentAction }: FormProps) {
	const [, action] = useActionState(commentAction, null);

	return (
		<article className='py-4 px-6 border-y border-y-grey-lightest'>
			<form action={action} className='flex flex-col items-end gap-y-2'>
				<textarea
					name='content'
					className='w-full h-24 bg-transparent border border-grey-lightest outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-grey-dark rounded-[4px]'
				></textarea>
				<input type='hidden' name='post_id' value={postId} />
				<SubmitButton size='medium'>Reply</SubmitButton>
			</form>
		</article>
	);
}
