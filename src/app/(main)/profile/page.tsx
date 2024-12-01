import db from '@/services/db';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

async function getLoggedInUser() {
	const cookieStore = await cookies();
	const session = await getIronSession<{ id?: string }>(cookieStore, {
		cookieName: 'social_media_logged_in',
		password: process.env.COOKIE_PASSWORD!,
	});

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
