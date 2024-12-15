import { Profile } from '@/components/common';
import { getUserByUsername } from '@/services/user';

interface UserDetailProps {
	params: Promise<{
		username: string;
	}>;
}

export default async function UserDetail({ params }: UserDetailProps) {
	const { username } = await params;
	const userInfo = await getUserByUsername(username);

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
			<section className='pb-20'>
				<ul className='flex h-8 border-b border-b-grey-lightest'>
					<li className='flex-1 flex items-center justify-center text-sm text-grey-light'>
						Posts
					</li>
					<li className='flex-1 flex items-center justify-center text-sm text-grey-light'>
						Likes
					</li>
				</ul>
			</section>
		</>
	);
}
