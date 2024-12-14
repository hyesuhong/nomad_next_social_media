import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
	id?: number;
	username?: string;
}

export async function getSession() {
	const cookieStore = await cookies();
	return getIronSession<SessionContent>(cookieStore, {
		cookieName: 'social_media_logged_in',
		password: process.env.COOKIE_PASSWORD!,
	});
}
