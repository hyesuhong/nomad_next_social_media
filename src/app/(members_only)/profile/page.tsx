import { Profile } from '@/components/common';
import { PAGE_ROUTES } from '@/libs/constants/routes';
import { getLoggedInUser } from '@/services/user';
import Link from 'next/link';

export default async function ProfilePage() {
	const user = await getLoggedInUser();
	const userEditRoute = PAGE_ROUTES.users_detail_edit.generator
		? PAGE_ROUTES.users_detail_edit.generator(user.username)
		: '';

	return (
		<>
			<section className='flex flex-col items-center gap-y-1 pt-8 pb-4 px-6 border-b border-b-grey-lightest'>
				<Profile name={user.username} imageUrl={user.profile} size='large' />
				<h2 className='text-base mt-3'>{user.username}</h2>
				{user.bio && <p className='text-sm text-grey-light'>{user.bio}</p>}
				<Link
					href={userEditRoute}
					className='text-sm self-end text-grey-light hover:text-grey-dark mt-4'
				>
					edit profile
				</Link>
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
