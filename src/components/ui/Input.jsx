import React from 'react';
import clsx from 'clsx';

export default function BaseInput({
	type = 'text',
	name,
	value,
	onChange,
	placeholder = '',
	className = '',
	...props
}) {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={clsx(
				'w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-text',
				'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
				className
			)}
			{...props}
		/>
	);
}
