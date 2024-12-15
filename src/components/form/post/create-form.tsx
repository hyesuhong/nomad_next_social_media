'use client';

import { createPost } from '@/services/post';
import { useActionState } from 'react';
import SubmitButton from '../submit-button';

export default function CreateForm() {
	const [, action] = useActionState(createPost, null);

	return (
		<section className='py-4 px-6 border-b border-b-grey-lightest'>
			<form action={action} className='flex flex-col items-end gap-y-2'>
				<textarea
					name='content'
					className='w-full h-24 bg-transparent border border-grey-lightest outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-grey-dark rounded-[4px]'
				></textarea>
				<SubmitButton size='medium'>Post</SubmitButton>
			</form>
		</section>
	);
}
