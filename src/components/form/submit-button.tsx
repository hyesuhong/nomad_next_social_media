'use client';

import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../common';

type ButtonSize = 'full' | 'large' | 'medium';

interface SubmitButtonProps extends PropsWithChildren {
	size?: ButtonSize;
}

export default function SubmitButton({
	size = 'full',
	children,
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} size={size}>
			{pending ? 'Loading...' : children}
		</Button>
	);
}
