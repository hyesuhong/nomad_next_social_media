import { Profile } from '@/components/common';
import { PostItem } from '@/components/post';
import { getPostsByUserId } from '@/services/post';
import { getUserByUsername } from '@/services/user';

interface UserDetailProps {
	params: Promise<{
		username: string;
	}>;
}

export default async function UserDetail({ params }: UserDetailProps) {
	const { username } = await params;
	const userInfo = await getUserByUsername(username);
	const posts = await getPostsByUserId(userInfo.id);

	return (
		<>
			<section className='flex flex-col items-center gap-y-1 pt-8 pb-4 border-b border-b-grey-lightest'>
				<Profile
					name={userInfo.username || username}
					imageUrl={userInfo.profile}
					size='large'
				/>
				<h2 className='text-base mt-3'>{userInfo.username || username}</h2>
				{userInfo.bio && (
					<p className='text-sm text-grey-light'>{userInfo.bio}</p>
				)}
			</section>
			<section className='pt-4 pb-20'>
				{posts.length > 0 ? (
					<>
						{posts.map((post) => (
							<PostItem
								post_id={post.id}
								content={post.content}
								author={post.author}
								created_at={post.created_at}
								_count={post._count}
								key={post.id}
							/>
						))}
					</>
				) : (
					<p className='text-xs text-grey-light px-6 text-center'>
						{username} hasn&apos;t written any posts yet.
					</p>
				)}
			</section>
		</>
	);
}
