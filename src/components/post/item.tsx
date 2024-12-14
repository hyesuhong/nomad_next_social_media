import { PAGE_ROUTES } from '@/libs/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import sampleProfile from '../../../public/sample_profile.jpeg';

interface ItemProps {
	author: {
		id: number;
		username: string;
	};
	content: string;
	created_at: Date;
	post_id: number;
}

export default function Item({ post_id, content, author }: ItemProps) {
	const postDetailRoute = PAGE_ROUTES.post_detail.generator
		? PAGE_ROUTES.post_detail.generator(post_id)
		: '';

	const userDetailRoute = PAGE_ROUTES.users_detail.generator
		? PAGE_ROUTES.users_detail.generator(author.username)
		: '';

	return (
		<div className='grid grid-cols-[max-content_minmax(0,_1fr)] grid-rows-[repeat(2,_max-content)] gap-x-4 gap-y-2 p-4 border border-zinc-300 mb-4 last:mb-0'>
			<Link
				href={userDetailRoute}
				className='grid grid-cols-subgrid col-span-2 items-center'
			>
				<div className='w-12 h-12 overflow-hidden rounded-full '>
					<Image src={sampleProfile} alt='' width={50} height={50} />
				</div>
				<h4>{author.username}</h4>
			</Link>
			<Link href={postDetailRoute} className='col-span-2'>
				<div>{content}</div>
			</Link>
		</div>
	);
}
