'use client';

import { IcoHomeOutline, IcoPlus, IcoUser } from '@/assets/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabBarLinks = [
	{ href: '/', icon: <IcoHomeOutline /> },
	{ href: '/upload', icon: <IcoPlus /> },
	{ href: '/profile', icon: <IcoUser /> },
];

export default function TabBar() {
	const pathname = usePathname();

	return (
		<div className='fixed bottom-0 left-0 w-full'>
			<ul className='flex max-w-md w-full h-16 mx-auto'>
				{tabBarLinks.map((link, index) => (
					<li key={index} className='flex-1 flex items-center justify-center'>
						<Link
							href={link.href}
							className={`w-6 h-6 ${pathname === link.href ? 'opacity-100' : 'opacity-50'}`}
						>
							{link.icon}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
