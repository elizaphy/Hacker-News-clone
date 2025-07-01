import React from 'react';
import clsx from 'clsx';

export default function BaseSelect({
	value,
	onChange,
	options = [],
	placeholder = 'Select an option',
	className = '',
	name,
	id,
	...props
}) {
	return (
		<select
			id={id || name}
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className={clsx(
				'w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700',
				'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
				className
			)}
			{...props}
		>
			{placeholder && (
				<option value="" disabled hidden>
					{placeholder}
				</option>
			)}
			{options.map((opt) => (
				<option key={opt.value} value={opt.value}>
					{opt.label}
				</option>
			))}
		</select>
	);
}
