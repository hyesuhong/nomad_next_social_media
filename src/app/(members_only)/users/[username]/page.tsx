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
		<main className='flex flex-col justify-center items-center gap-y-4'>
			<section className='grid grid-cols-[max-content_minmax(0,_1fr)] items-end max-w-xl w-full'>
				<Profile
					name={userInfo.username || username}
					imageUrl={userInfo.profile}
					size='large'
				/>
				<h2>{userInfo.username || username}</h2>
				{userInfo.bio && <p>{userInfo.bio}</p>}
			</section>
		</main>
	);
}
