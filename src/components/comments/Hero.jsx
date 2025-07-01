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
		<section className="bg-gradient min-h-[50vh] flex items-center justify-center text-text px-4">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				className="text-center max-w-xl w-full"
			>
				{/* Title */}
				<motion.p variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">
					Reader Comments
				</motion.p>
				<motion.p variants={itemVariants} className="mb-6 text-lg text-gray-600">
					See what people are saying about this story
				</motion.p>
			</motion.div>
		</section>
	);
}
