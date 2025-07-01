// eslint-disable-next-line no-unused-vars
import BaseButton from '@components/ui/Button';
import BaseInput from '@components/ui/Input';
import BaseSelect from '@components/ui/Select';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const options = [
	{ value: 'top', label: 'Top Stories' },
	{ value: 'best', label: 'Best Stories' },
	{ value: 'new', label: 'New Stories' },
];

export default function Hero({
	searchTerm,
	onSearchChange,
	onClearSearch,
	filterType,
	onFilterChange,
	filteredStories,
}) {
	return (
		<section className="min-h-[60vh] flex items-center justify-center bg-gradient text-text  px-4">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="text-center max-w-xl w-full"
			>
				{/* Title */}
				<motion.p variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">
					Find the latest Hacker News
				</motion.p>
				<motion.p variants={itemVariants} className="mb-6 text-lg text-text">
					Search top, new, or best stories instantly
				</motion.p>

				{/* Search Input Group */}

				<motion.div variants={itemVariants} className=" mb-8">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1">
							<div className="relative !text-text">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text w-5 h-5" />
								<BaseInput
									id="search"
									type="text"
									placeholder="Search stories..."
									value={searchTerm}
									onChange={onSearchChange}
									className="pl-12 pr-10 py-3 !text-text shadow-sm rounded-full bg-white"
								/>
								{searchTerm && (
									<button
										onClick={onClearSearch}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 !text-text hover:text-text-gray !bg-transparent"
									>
										✕
									</button>
								)}
							</div>
						</div>

						<div className="sm:w-48">
							<BaseSelect
								value={filterType}
								onChange={onFilterChange}
								options={options}
								placeholder="Filter stories"
								className="py-3 pr-3"
							/>
						</div>
					</div>

					{searchTerm && (
						<div className="mt-4 text-sm text-gray-600">
							{filteredStories?.length} results found for "{searchTerm}"
						</div>
					)}
				</motion.div>
			</motion.div>
		</section>
	);
}
