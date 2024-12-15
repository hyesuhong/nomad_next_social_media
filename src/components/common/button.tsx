import { ButtonHTMLAttributes } from 'react';

type ButtonLevel = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'full' | 'large' | 'medium' | 'small';

const buttonColorVariants: Record<ButtonLevel, string> = {
	primary:
		'bg-primary-default text-neutral hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled',
	secondary:
		'bg-neutral border border-grey-lightest hover:border-grey-light active:bg-grey-lightest/20 disabled:opacity-50 disabled:bg-neutral disabled:border-grey-lightest',
	ghost:
		'bg-transparent hover:bg-primary-default/10 active:bg-primary-default/30 disabled:bg-transparent disabled:opacity-50',
};

const buttonSizeVariants: Record<ButtonSize, string> = {
	full: 'w-full h-10 rounded-[4px] text-sm',
	large: 'h-10 px-6 rounded-[4px] text-sm',
	medium: 'h-8 px-4 rounded-[4px] text-sm',
	small: 'h-6 px-2 rounded-[4px] text-xs',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	level?: ButtonLevel;
	size?: ButtonSize;
}

export default function Button({
	level = 'primary',
	size = 'full',
	disabled,
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			disabled={disabled}
			className={`${buttonColorVariants[level]} ${buttonSizeVariants[size]} transition-colors disabled:cursor-not-allowed ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
