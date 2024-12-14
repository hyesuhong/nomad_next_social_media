import { UpdateForm } from '@/components/user';
import { getLoggedInUser } from '@/services/user';

export default async function UserEdit() {
	const user = await getLoggedInUser();

	return (
		<main>
			<section className='max-w-xl w-full mx-auto'>
				<h2 className='text-lg font-medium'>Account Information Edit</h2>
				<UpdateForm user={user} />
			</section>
		</main>
	);
}
