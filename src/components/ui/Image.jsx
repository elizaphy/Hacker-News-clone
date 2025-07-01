import clsx from 'clsx';
import React from 'react';

export default function BaseImage({ src, className, rounded = 'md', objectFit = 'cover', ...props }) {
	const roundedMap = {
		none: '',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		full: 'rounded-full',
	};

	return (
		<img
			src={src}
			alt="thumbnail"
			loading="lazy"
			className={clsx(
				'w-full h-full object-center bg-gray-200 transition-transform duration-300 ease-in-out group-hover:scale-107',
				`object-${objectFit}`,
				roundedMap[rounded],
				className
			)}
			onError={(e) => (e.target.src = `/assets/images/default.png`)}
			{...props}
		/>
	);
}
