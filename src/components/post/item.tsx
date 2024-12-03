import Image from 'next/image';
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

export default function Item({ content, author }: ItemProps) {
	return (
		<div className='grid grid-cols-[max-content_minmax(0,_1fr)] grid-rows-[repeat(2,_max-content)] items-center gap-x-4 gap-y-2 p-4 border border-zinc-300 mb-4 last:mb-0'>
			<div className='w-12 h-12 overflow-hidden rounded-full '>
				<Image src={sampleProfile} alt='' width={50} height={50} />
			</div>
			<h4>{author.username}</h4>
			<div className='col-span-2'>{content}</div>
		</div>
	);
}