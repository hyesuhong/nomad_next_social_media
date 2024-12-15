'use client';

import { IcoUser } from '@/assets/icons';
import Image, { ImageLoader } from 'next/image';
import { SyntheticEvent, useState } from 'react';

const initialSize = {
	width: 0,
	height: 0,
};

type ProfileSize = 'small' | 'medium' | 'large';
interface ProfileProps {
	name: string;
	imageUrl?: string | null;
	size?: ProfileSize;
}

const profileSizeVariants: Record<ProfileSize, string> = {
	small: 'size-6',
	medium: 'size-8',
	large: 'size-20',
};

export default function Profile({
	name,
	imageUrl,
	size = 'small',
}: ProfileProps) {
	const [imageSize, setImageSize] = useState(initialSize);
	const imageLoader: ImageLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 80}`;
	};

	const onLoad = (ev: SyntheticEvent<HTMLImageElement>) => {
		const {
			currentTarget: { naturalHeight, naturalWidth },
		} = ev;

		setImageSize({ width: naturalWidth, height: naturalHeight });
	};

	return (
		<>
			<div
				className={`${profileSizeVariants[size]} border border-zinc-500 rounded-full overflow-hidden [&_svg]:size-full [&_svg]:translate-y-[10%]`}
			>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={name}
						width={imageSize.width}
						height={imageSize.height}
						loader={imageLoader}
						onLoad={onLoad}
						loading='eager'
					/>
				) : (
					<IcoUser />
				)}
			</div>
		</>
	);
}
