'use client';

import { IcoXMark } from '@/assets/icons';
import { PostItem } from '@/components/post';
import { searchPostByKeyword } from '@/services/post';
import { FormEvent, startTransition, useActionState } from 'react';

export default function Search() {
	const [state, action] = useActionState(searchPostByKeyword, null);

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		const { currentTarget } = ev;
		const formData = new FormData(currentTarget);

		startTransition(() => {
			action(formData);
		});
	};

	return (
		<main>
			<section className='max-w-xl w-full mx-auto px-4 py-8'>
				<form
					onSubmit={handleSubmit}
					className='relative p-2 w-full border border-zinc-300 focus-within:border-zinc-700'
				>
					<input
						type='text'
						name='keyword'
						placeholder='Search posts by keyword'
						className='peer w-full h-10 bg-transparent border-none outline-none'
					/>
					<button
						type='reset'
						className='absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 p-0.5 bg-zinc-400 text-zinc-50 rounded-full *:w-full *:h-full peer-placeholder-shown:hidden'
					>
						<IcoXMark />
					</button>
				</form>
			</section>
			<section className='max-w-xl w-full mx-auto px-4 py-8'>
				{!state?.results ? (
					<p>Search first</p>
				) : (
					<>
						{state.results.map((post) => (
							<PostItem
								post_id={post.id}
								content={post.content}
								author={post.author}
								created_at={post.created_at}
								key={post.id}
							/>
						))}
					</>
				)}
			</section>
		</main>
	);
}
