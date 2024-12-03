import { getPostById } from '@/services/post';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import sampleProfile from '../../../../../public/sample_profile.jpeg';

interface PostDetailPage {
	params: Promise<{ id: string }>;
}

export default async function PostDetail({ params }: PostDetailPage) {
	const { id } = await params;
	const post = await getPostById(+id);

	if (!post) {
		notFound();
	}

	return (
		<main>
			<section className='max-w-xl w-full mx-auto px-4 py-8'>
				<div className='grid grid-cols-[max-content_minmax(0,_1fr)] grid-rows-[repeat(2,_max-content)] gap-x-4 gap-y-2 p-4 border border-zinc-300 mb-4 last:mb-0'>
					<Link
						href={`/profile/${post.author.id}`}
						className='grid grid-cols-subgrid col-span-2 items-center'
					>
						<div className='w-12 h-12 overflow-hidden rounded-full '>
							<Image src={sampleProfile} alt='' width={50} height={50} />
						</div>
						<h4>{post.author.username}</h4>
					</Link>

					<div className='col-span-2'>{post.content}</div>
				</div>
			</section>
		</main>
	);
}
