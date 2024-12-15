interface LoadingScreenProps {
	isFull?: boolean;
}

const sizeVariants: Record<number, string> = {
	0: 'fixed top-0 left-0 w-full h-full bg-neutral/20',
	1: 'w-full h-24',
};

export default function LoadingScreen({ isFull }: LoadingScreenProps) {
	return (
		<div
			className={`${sizeVariants[Number(isFull)]} flex justify-center items-center text-sm`}
		>
			Loading...
		</div>
	);
}
