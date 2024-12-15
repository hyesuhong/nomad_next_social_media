import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../common';

export default function AuthButton({ children }: PropsWithChildren) {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending}>{pending ? 'Loading...' : children}</Button>
	);
}
