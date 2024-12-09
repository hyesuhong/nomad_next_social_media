import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			className='bg-zinc-50/50 h-8 px-8 text-sm hover:bg-indigo-300 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors'
		>
			{pending ? 'Replying...' : 'Reply'}
		</button>
	);
}
