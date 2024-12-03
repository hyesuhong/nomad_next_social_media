export default function Loading() {
	return (
		<div className='max-w-xl w-full mx-auto px-4 py-8'>
			{[...Array(2)].map((_, index) => (
				<div className='border border-zinc-300 mb-4 last:mb-0' key={index}>
					<div className='grid grid-cols-[max-content_minmax(0,_1fr)] grid-rows-[repeat(2,_max-content)] items-center gap-4 p-4 animate-pulse'>
						<div className='w-12 h-12 overflow-hidden rounded-full bg-zinc-200' />
						<div className='w-40 h-6 bg-zinc-200 rounded-sm' />
						<div className='col-span-2'>
							<ul className='flex flex-col gap-y-2'>
								<li className='w-full h-4 bg-zinc-200 rounded-sm' />
								<li className='w-full h-4 bg-zinc-200 rounded-sm' />
								<li className='w-1/3 h-4 bg-zinc-200 rounded-sm' />
							</ul>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
