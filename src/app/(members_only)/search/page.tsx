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
		<>
			<section className='py-4 px-6'>
				<form
					onSubmit={handleSubmit}
					className='relative p-2 w-full rounded-[4px] border border-grey-lightest focus-within:border-grey-dark'
				>
					<input
						type='text'
						name='keyword'
						placeholder='Search posts by keyword'
						className='peer w-full h-8 bg-transparent border-none outline-none text-sm'
					/>
					<button
						type='reset'
						className='absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 p-0.5 bg-grey-light text-neutral rounded-full *:w-full *:h-full peer-placeholder-shown:hidden'
					>
						<IcoXMark />
					</button>
				</form>
			</section>
			<section className='pt-4 pb-20'>
				{!state?.results ? (
					<p className='text-xs text-grey-light px-6 text-center'>
						No results.
					</p>
				) : (
					<>
						{state.results.map((post) => (
							<PostItem
								post_id={post.id}
								content={post.content}
								author={post.author}
								created_at={post.created_at}
								_count={post._count}
								isLiked={post.likes.length > 0}
								key={post.id}
							/>
						))}
					</>
				)}
			</section>
		</>
	);
}
