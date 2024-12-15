import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	errorMessage?: string[];
}

export default function Textarea({
	label,
	errorMessage,
	...props
}: TextareaProps) {
	return (
		<div>
			<div className='flex flex-col-reverse'>
				<textarea
					{...props}
					className={`w-full h-32 p-1 bg-transparent outline-none border-b ${errorMessage ? 'border-b-red-500' : 'border-b-grey-light focus:border-b-grey-dark'} text-sm transition-colors resize-none overflow-x-hidden overflow-y-auto`}
				></textarea>
				{label && <label className='text-xs text-grey-light'>{label}</label>}
			</div>
		</div>
	);
}
