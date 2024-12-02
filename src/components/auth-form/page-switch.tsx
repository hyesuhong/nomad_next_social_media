import Link from 'next/link';

interface PageSwitchProps {
	message: string;
	targetUrl: { label: string; url: string };
}

export default function PageSwitch({ message, targetUrl }: PageSwitchProps) {
	return (
		<>
			<p className='text-sm font-light text-center'>
				{message}
				<br />
				<Link
					href={targetUrl.url}
					className='relative font-medium transition-colors hover:text-indigo-400'
				>
					{targetUrl.label}
				</Link>
			</p>
		</>
	);
}
