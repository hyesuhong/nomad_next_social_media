interface UserDetailProps {
	params: {
		username: string;
	};
}

export default async function UserDetail({ params }: UserDetailProps) {
	const { username } = await params;

	return (
		<main className='flex flex-col justify-center items-center gap-y-4'>
			<p>{username}</p>
		</main>
	);
}
