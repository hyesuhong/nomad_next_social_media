import { PAGE_ROUTES } from '@/libs/constants/routes';
import { formatDate } from '@/libs/utils/format';
import Link from 'next/link';
import { Profile } from '../common';

interface ItemProps {
	userId: number;
	username: string;
	comment: string;
	createdAt: Date;
}

export default function Item({ username, comment, createdAt }: ItemProps) {
	const userDetailRoute = PAGE_ROUTES.users_detail.generator
		? PAGE_ROUTES.users_detail.generator(username)
		: '';
	return (
		<div className='px-6 py-4 border-t border-t-grey-lightest first:border-t-0 flex gap-x-2'>
			<Link href={userDetailRoute}>
				<Profile name={username} size='medium' />
			</Link>
			<div className='flex-1 pt-1 grid grid-cols-[min-content_minmax(0,_1fr)] items-center gap-x-2'>
				<h4 className='text-sm'>
					<Link href={userDetailRoute}>{username}</Link>
				</h4>
				<span className='text-xs text-grey-light'>{formatDate(createdAt)}</span>
				<p className='col-span-2 mt-1'>{comment}</p>
			</div>
		</div>
	);
}
