export default function Loading() {
	return (
		<div className='py-4'>
			{[...Array(3)].map((_, index) => (
				<div
					key={index}
					className='px-6 py-4 border-t border-t-grey-lightest first:border-t-0'
				>
					<div className='flex gap-x-2 animate-pulse'>
						<div className='size-8 rounded-full bg-grey-lightest' />
						<div className='flex-1 pt-1 grid grid-cols-[min-content_minmax(0,_1fr)] items-center gap-x-2'>
							<div className='w-20 h-5 bg-grey-lightest rounded-sm' />
							<div className='col-span-2 mt-1 flex flex-col gap-y-1'>
								<div className='w-full h-4 bg-grey-lightest rounded-sm' />
								<div className='w-full h-4 bg-grey-lightest rounded-sm' />
								<div className='w-1/3 h-4 bg-grey-lightest rounded-sm' />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
