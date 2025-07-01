// eslint-disable-next-line no-unused-vars
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

export default function Hero() {
	return (
		<section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 text-gray-800 px-4">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="text-center max-w-xl w-full"
			>
				{/* Title */}
				<motion.p variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">
					Hacker News Job Board
				</motion.p>
				<motion.p variants={itemVariants} className="mb-6 text-lg text-gray-600">
					Browse the latest job postings shared by the Hacker News community.
				</motion.p>

				{/* Search Input Group */}
				<motion.div variants={itemVariants} className="relative max-w-md mx-auto">
					<input
						type="text"
						placeholder="Search job title or company..."
						className="w-full rounded-full py-3 pl-12 pr-4 text-gray-800 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
					/>
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
				</motion.div>
			</motion.div>
		</section>
	);
}
