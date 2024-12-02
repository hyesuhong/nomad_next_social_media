import { getSession } from '@/libs/utils/session';
import db from '@/services/db';
import { notFound } from 'next/navigation';

async function getLoggedInUser() {
	const session = await getSession();

	if (!session.id) {
		notFound();
	}

	const user = await db.user.findUnique({
		where: { id: Number(session.id) },
	});

	return user || notFound();
}

export default async function Profile() {
	const user = await getLoggedInUser();

	return (
		<>
			<main className='h-screen flex flex-col justify-center items-center gap-y-4 bg-indigo-50'>
				<p>Welcome, {user.username}!</p>
			</main>
		</>
	);
}
