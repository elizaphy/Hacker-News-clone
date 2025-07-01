import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640); // tailwind sm breakpoint
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const getVisiblePages = () => {
		if (isMobile) {
			// Mobile: show max 4 buttons (simple)
			const pages = [];

			if (totalPages <= 4) {
				for (let i = 1; i <= totalPages; i++) {
					pages.push(i);
				}
			} else if (currentPage <= 2) {
				pages.push(1, 2, 3, totalPages);
			} else if (currentPage >= totalPages - 1) {
				pages.push(1, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, currentPage, currentPage + 1, totalPages);
			}

			return [...new Set(pages)].sort((a, b) => a - b);
		} else {
			const delta = 1;
			const range = [];
			const rangeWithDots = [];

			for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
				range.push(i);
			}

			if (currentPage - delta > 2) {
				rangeWithDots.push(1, '...');
			} else {
				rangeWithDots.push(1);
			}

			rangeWithDots.push(...range);

			if (currentPage + delta < totalPages - 1) {
				rangeWithDots.push('...', totalPages);
			} else if (totalPages > 1) {
				rangeWithDots.push(totalPages);
			}

			return rangeWithDots;
		}
	};

	return (
		<div className="flex items-center justify-center space-x-2 mt-8">
			<button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btnArrow">
				<ChevronLeft className="w-4 h-4" />
				{/* <span>Previous</span> */}
			</button>

			{getVisiblePages().map((page, index) => (
				<button
					key={index}
					onClick={() => typeof page === 'number' && onPageChange(page)}
					disabled={page === '...'}
					className={`px-3 py-2 text-sm font-medium rounded-md shadow ${
						page === currentPage
							? '!bg-orange-600 text-white'
							: page === '...'
								? 'text-gray-400 cursor-default'
								: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
					}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="btnArrow"
			>
				{/* <span>Next</span> */}
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
}
