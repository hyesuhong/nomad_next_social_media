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
				<div className='grid grid-cols-[max-content_minmax(0,_1fr)] gap-x-4 gap-y-2 p-4 border border-zinc-300'>
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

					<div className='col-span-2 flex justify-end'>
						<button className='flex items-center gap-x-1 h-8 px-2 text-sm text-zinc-500 hover:text-red-400 transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-4 h-4'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
								/>
							</svg>
							<span>{post._count.interactions}</span>
						</button>
					</div>
				</div>

				<form
					// action={action}
					className='flex flex-col items-end gap-y-2 border border-zinc-300 p-2'
				>
					<textarea
						name='content'
						className='w-full h-24 bg-transparent border border-zinc-300 outline-none text-sm p-2 resize-none overflow-x-hidden overflow-y-auto focus:border-indigo-400'
					></textarea>
					<button className='bg-zinc-50/50 h-8 px-8 text-sm hover:bg-indigo-300 disabled:bg-zinc-300 disabled:text-zinc-400 disabled:cursor-not-allowed transition-colors'>
						Reply
					</button>
				</form>

				{/* {post._count.comments > 0 && <div>comments</div>} */}
				<div className='border border-zinc-300'>
					<dl className='flex gap-x-4 p-2'>
						<dt>
							<div className='w-12 h-12 overflow-hidden rounded-full '>
								<Image src={sampleProfile} alt='' width={50} height={50} />
							</div>
						</dt>
						<dd>
							<h4>username</h4>
							<p>comment</p>
						</dd>
					</dl>
				</div>
			</section>
		</main>
	);
}
