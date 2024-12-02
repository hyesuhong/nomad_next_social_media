import { PAGE_ROUTES } from '@/libs/constants/routes';
import { logOut } from '@/services/auth';
import Link from 'next/link';

export default function Header() {
	return (
		<header className='sticky top-0 w-full h-10 flex justify-between items-center gap-x-4 px-6 text-sm'>
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
