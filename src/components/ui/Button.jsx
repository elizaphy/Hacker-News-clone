import React from 'react';
import clsx from 'clsx';

export default function BaseButton({
	children,
	className,
	type = 'button',
	variant = 'primary',
	size = 'md',
	...props
}) {
	const baseStyles =
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:!outline-none disabled:opacity-50 disabled:pointer-events-none';

	const variants = {
		primary: '!bg-primary-500 text-white hover:!bg-primary focus:ring-orange-500',
		secondary: '!bg-secondary text-white hover:!bg-secondary/50 focus:ring-gray-400',
		outline: 'border border-primary text-primary hover:!bg-primary hover:text-white',
	};

	const sizes = {
		sm: 'px-5 py-1 text-sm',
		md: 'px-5 py-1 text-base',
		lg: 'px-6 py-2 text-lg',
	};

	return (
		<button type={type} className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
			{children}
		</button>
	);
}
