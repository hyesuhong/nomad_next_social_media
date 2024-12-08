import { Comments } from '@/components/comment';
import { LikeButton } from '@/components/post';
import { getComments } from '@/services/comment';
import { getLikeStatus } from '@/services/interaction';
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
	const postId = +id;
	const post = await getPostById(postId);

	if (!post) {
		notFound();
	}

	const comments = await getComments(postId);
	const likeStatus = await getLikeStatus(postId);

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
						<LikeButton {...likeStatus} postId={postId} />
					</div>
				</div>

				<Comments postId={postId} initialComments={comments} />
			</section>
		</main>
	);
}
