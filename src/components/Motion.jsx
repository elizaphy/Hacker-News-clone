import { motion } from 'framer-motion';
import { useMemo } from 'react';

// Title Motion
const titleVariant = {
	hidden: { y: -50, opacity: 0 },
	visible: { y: 0, opacity: 1 },
};

export const TitleMotion = ({ children, className, delay, duration = 0.5, ...rest }) => {
	return (
		<motion.div
			variants={titleVariant}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			transition={{ duration, delay }}
			className={className}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

// Fade Motion
const fadeVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const FadeMotion = ({ children, delay, duration = 1, ...rest }) => (
	<motion.div
		variants={fadeVariants}
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true }}
		transition={{ duration, delay }}
		{...rest}
	>
		{children}
	</motion.div>
);

// Fade Left Motion
const fadeLeftVariants = {
	hidden: { opacity: 0, x: 50 },
	visible: { opacity: 1, x: 0 },
};

export const FadeLeftMotion = ({ children, delay, duration = 1, ...rest }) => (
	<motion.div
		variants={fadeLeftVariants}
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true }}
		transition={{ duration, delay }}
		{...rest}
	>
		{children}
	</motion.div>
);

// Slide Motion
export const SlideMotion = ({
	children,
	type = 'left',
	duration,
	delay,
	motionType = 'spring',
	forceAnimateOnStart = false,
	...rest
}) => {
	const slideVariants = {
		hidden: { opacity: 0, translateX: type === 'left' ? -100 : 100 },
		visible: { opacity: 1, translateX: 0 },
	};

	const whenToAnimate = useMemo(
		() => (forceAnimateOnStart ? { animate: 'visible' } : { whileInView: 'visible' }),
		[forceAnimateOnStart]
	);

	return (
		<motion.div
			variants={slideVariants}
			initial="hidden"
			{...whenToAnimate}
			viewport={{ once: true }}
			transition={{ duration, delay, type: motionType }}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

// Card Hover Motion
const cardHoverVariants = {
	hidden: {
		scale: 1,
		boxShadow: 0,
		border: 'none',
		translateY: 0,
	},
	visible: {
		scale: 1,
		boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
		border: '1px solid #ccc',
		translateY: -15,
	},
};

export const CardHoverMotion = ({ children, duration, ...rest }) => (
	<motion.div variants={cardHoverVariants} initial="hidden" whileHover="visible" transition={{ duration }} {...rest}>
		{children}
	</motion.div>
);

// Card Slide In Motion
const cardSlideInVariants = {
	hidden: { translateY: 50, opacity: 0 },
	visible: { translateY: 0, opacity: 1 },
};

export const CardSlideInMotion = ({
	children,
	duration,
	delay,
	type = 'spring',
	forceAnimateOnStart = false,
	...rest
}) => {
	const whenToAnimate = useMemo(
		() => (forceAnimateOnStart ? { animate: 'visible' } : { whileInView: 'visible' }),
		[forceAnimateOnStart]
	);

	return (
		<motion.div
			variants={cardSlideInVariants}
			initial="hidden"
			{...whenToAnimate}
			transition={{ duration, delay, type }}
			viewport={{ once: true }}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

// Card Zoom Motion
const cardZoomVariants = {
	hidden: { scale: 0.8, opacity: 0 },
	visible: { scale: 1, opacity: 1 },
};

export const CardZoomMotion = ({ children, duration, delay, ...rest }) => (
	<motion.div
		variants={cardZoomVariants}
		initial="hidden"
		whileInView="visible"
		transition={{ duration, delay, type: 'spring' }}
		viewport={{ once: true }}
		{...rest}
	>
		{children}
	</motion.div>
);

// Toggle Motion
const toggleMotionVariants = {
	hidden: {
		scale: 0,
		opacity: 0,
		transformOrigin: 'top left',
	},
	visible: {
		scale: 1,
		opacity: 1,
	},
};

export const ToggleMotion = ({ children, duration = 0.3, delay, ...rest }) => (
	<motion.div
		variants={toggleMotionVariants}
		initial="hidden"
		whileInView="visible"
		exit="hidden"
		transition={{ duration, delay, type: 'spring' }}
		viewport={{ once: true }}
		{...rest}
	>
		{children}
	</motion.div>
);

// Button Motion
const buttonMotionVariants = {
	hidden: { scale: 0.3, opacity: 0 },
	visible: { scale: 1, opacity: 1 },
};

export const ButtonMotion = ({ children, duration = 1, delay = 0.2, ...rest }) => (
	<motion.div
		variants={buttonMotionVariants}
		initial="hidden"
		whileInView="visible"
		exit="hidden"
		transition={{ duration, delay, type: 'spring' }}
		viewport={{ once: true }}
		{...rest}
	>
		{children}
	</motion.div>
);

// Banner Motion (Infinite Loop)
const bannerVariant = {
	initial: { y: 0, opacity: 0 },
	animate: {
		y: [20, 0, 20],
		opacity: [1, 0.9, 1],
	},
};

export const BannerMotion = ({ children, ...rest }) => (
	<motion.div
		variants={bannerVariant}
		initial="initial"
		animate="animate"
		transition={{
			repeat: Infinity,
			duration: 5,
			type: 'keyframes',
		}}
		{...rest}
	>
		{children}
	</motion.div>
);
