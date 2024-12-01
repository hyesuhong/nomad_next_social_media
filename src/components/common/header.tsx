import { PAGE_ROUTES } from '@/libs/constants/routes';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function logOut() {
	'use server';

	const cookieStore = await cookies();
	const session = await getIronSession<{ id: string }>(cookieStore, {
		cookieName: 'social_media_logged_in',
		password: process.env.COOKIE_PASSWORD!,
	});

	session.destroy();
	redirect(PAGE_ROUTES.login.path);
}

export default function Header() {
	return (
		<header>
			<nav></nav>
			<form action={logOut}>
				<button>Logout</button>
			</form>
		</header>
	);
}
