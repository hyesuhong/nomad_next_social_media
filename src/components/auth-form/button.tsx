import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, disabled }: ButtonProps) {
	return (
		<button
			disabled={disabled}
			className='bg-zinc-700 text-zinc-50 h-10 text-sm rounded-md hover:bg-indigo-300 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed'
		>
			{children}
		</button>
	);
}
