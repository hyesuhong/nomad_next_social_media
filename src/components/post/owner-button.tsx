import { IcoEllipsis } from '@/assets/icons';
import { Button } from '../common';

export default function OwnerButton() {
	return (
		<Button size='small' level='ghost' className='[&_svg]:size-4 ml-auto'>
			<IcoEllipsis />
		</Button>
	);
}
