import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

export default function Button({ children }: PropsWithChildren) {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			className='bg-zinc-700 text-zinc-50 h-10 text-sm rounded-md hover:bg-indigo-300 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed'
		>
			{pending ? 'Loading...' : children}
		</button>
	);
}
