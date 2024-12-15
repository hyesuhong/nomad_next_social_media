import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string[];
}

export default function Input({ label, errorMessage, ...props }: InputProps) {
	return (
		<div>
			<div className='flex flex-col-reverse'>
				<input
					{...props}
					className={`w-full h-8 p-1 bg-transparent outline-none border-b ${errorMessage ? 'border-b-red-500' : 'border-b-grey-light focus:border-b-grey-dark'} text-sm transition-colors`}
				/>
				{label && <label className='text-xs text-grey-light'>{label}</label>}
			</div>
			{errorMessage && (
				<ul className='flex flex-col gap-y-0.5 text-xs px-1 mt-1 text-red-500'>
					{errorMessage.map((message, index) => (
						<li key={index}>{message}</li>
					))}
				</ul>
			)}
		</div>
	);
}
