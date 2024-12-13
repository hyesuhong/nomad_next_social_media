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
			<main className=''>
				<section className='relative grid grid-cols-[max-content_minmax(0,_1fr)] items-end max-w-xl w-full'>
					<Profile name={user.username} imageUrl={user.profile} size='large' />
					<h2>{user.username}</h2>
					{user.bio && <p>{user.bio}</p>}
					<Link href={userEditRoute} className='absolute top-0 right-0'>
						edit profile
					</Link>
				</section>
			</main>
		</>
	);
}
