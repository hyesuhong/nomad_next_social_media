import { IcoChatOutline } from '@/assets/icons';
import { Button } from '../common';

interface ButtonProps {
	count?: number;
	postId: number;
}

export default function CommentButton({ count }: ButtonProps) {
	return (
		<Button
			size='small'
			level='ghost'
			className='flex items-center gap-x-1 [&_svg]:size-4'
		>
			<IcoChatOutline />
			<span>{count}</span>
		</Button>
	);
}
