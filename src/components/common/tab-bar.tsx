'use client';

import {
	IcoArrowOut,
	IcoHomeOutline,
	IcoSearch,
	IcoUser,
} from '@/assets/icons';
import { logOut } from '@/services/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabBarLinks = [
	{ href: '/', icon: <IcoHomeOutline /> },
	{ href: '/search', icon: <IcoSearch /> },
	{ href: '/profile', icon: <IcoUser /> },
];

export default function TabBar() {
	const pathname = usePathname();

	return (
		<div className='fixed bottom-0 left-0 w-full bg-neutral'>
			<ul className='flex max-w-md w-full h-16 mx-auto border-t border-t-grey-lightest [&_svg]:size-full'>
				{tabBarLinks.map((link, index) => (
					<li key={index} className='flex-1 flex items-center justify-center'>
						<Link
							href={link.href}
							className={`size-6 ${pathname === link.href ? 'opacity-100' : 'opacity-50'}`}
						>
							{link.icon}
						</Link>
					</li>
				))}
				<li className='flex-1 flex items-center justify-center'>
					<button className='size-6 opacity-50' onClick={() => logOut()}>
						<IcoArrowOut />
					</button>
				</li>
			</ul>
		</div>
	);
}
