import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMessage?: string[];
}

export default function Input({ label, errorMessage, ...props }: InputProps) {
	return (
		<div>
			<div className='relative'>
				<input
					{...props}
					className={`peer w-full h-10 pt-3 px-1 pb-1 bg-transparent outline-none border-b ${errorMessage ? 'border-b-red-500' : 'border-b-grey-light focus:border-b-grey-dark'} text-sm placeholder:text-transparent transition-colors`}
				/>
				{label && (
					<label className='absolute top-0 left-1 -translate-y-1/2 text-xs text-grey-light pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs transition-all'>
						{label}
					</label>
				)}
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
