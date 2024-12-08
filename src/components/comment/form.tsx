import { useActionState } from 'react';
import SubmitButton from './submit-button';

interface FormProps {
	postId: number;
	commentAction: (prevState: unknown, formData: FormData) => Promise<void>;
}

export default function Form({ postId, commentAction }: FormProps) {
	const [, action] = useActionState(commentAction, null);

	return (
		<form
			action={action}
			className='flex flex-col items-end gap-y-2 border border-zinc-300 p-2'
		>
			<textarea
				name='content'
				className='w-full h-24 bg-transparent border border-zinc-300 outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-indigo-400'
			></textarea>
			<input type='hidden' name='post_id' value={postId} />
			<SubmitButton />
		</form>
	);
}
