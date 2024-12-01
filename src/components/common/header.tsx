import { PAGE_ROUTES } from '@/libs/constants/routes';
import { getSession } from '@/libs/utils/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function logOut() {
	'use server';

	const session = await getSession();

	session.destroy();
	redirect(PAGE_ROUTES.login.path);
}

export default function Header() {
	return (
		<header className='h-10 flex justify-between items-center gap-x-4 px-6 text-sm'>
			<h1>
				<Link href={PAGE_ROUTES.main.path}>Logo</Link>
			</h1>
			<nav className='flex items-center gap-x-4'>
				<Link href={PAGE_ROUTES.profile.path}>{PAGE_ROUTES.profile.name}</Link>
				<form action={logOut}>
					<button>Logout</button>
				</form>
			</nav>
		</header>
	);
}
