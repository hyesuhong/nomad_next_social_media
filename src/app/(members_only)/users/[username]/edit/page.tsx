import { UserUpdateForm } from '@/components/form';
import { getLoggedInUser } from '@/services/user';

export default async function UserEdit() {
	const user = await getLoggedInUser();

	return (
		<>
			<section className='min-h-screen flex flex-col items-center gap-y-8 pt-8 px-6 pb-24'>
				<h2 className='text-xl font-bold mb-2'>Account Information Edit</h2>
				<UserUpdateForm user={user} />
			</section>
		</>
	);
}
