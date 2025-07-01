import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { User, Clock, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import { getComment } from '../services/hackerNewsApi';
import { formatDate } from '@utils/formatDate';
import BaseImage from './ui/Image';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export const Comment = ({ commentId, level = 0, parentRepliesVisible = true }) => {
	const containerRef = useRef(null);
	const [showReplies, setShowReplies] = useState(parentRepliesVisible);
	const [visibleReplyCount, setVisibleReplyCount] = useState(5);

	// Fetch main comment
	const {
		data: comment,
		isLoading: loadingComment,
		error: commentError,
	} = useQuery({
		queryKey: ['comment', commentId],
		queryFn: () => getComment(commentId),
		enabled: !!commentId,
		select: (data) => (data?.deleted ? null : data),
	});

	// Fetch child comments (first 5 only)
	const { data: childComments = [], isLoading: loadingChildren } = useQuery({
		queryKey: ['child-comments', comment?.kids?.slice(0, visibleReplyCount)],
		queryFn: async () => {
			const kids = comment?.kids?.slice(0, visibleReplyCount) || [];
			const results = await Promise.all(kids.map(getComment));
			return results.filter((child) => child && !child.deleted);
		},
		enabled: !!comment?.kids?.length && showReplies,
	});

	// Smooth scroll into view when more replies loaded
	useEffect(() => {
		if (containerRef.current && visibleReplyCount > 5) {
			containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [visibleReplyCount]);

	if (loadingComment || loadingChildren) {
		return (
			<div className="animate-pulse">
				<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
				<div className="h-3 bg-gray-200 rounded w-1/2"></div>
			</div>
		);
	}

	if (!comment || comment.deleted) {
		return null;
	}

	const indentClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';
	const getAvatarUrl = `https://i.pravatar.cc/100?u=${encodeURIComponent(comment.by)}`;
	const totalReplies = comment?.kids?.length || 0;

	return (
		<div
			ref={containerRef}
			className={clsx(indentClass, level > 0 ? 'border-l-2 border-gray-100 pl-4' : '', 'mb-4')}
		>
			<div className="bg-gray-50 rounded-lg p-4">
				<div className="flex gap-4 items-start py-4">
					<div className="w-10 h-10 overflow-hidden rounded-full">
						<BaseImage src={getAvatarUrl} alt={comment?.by} rounded="full" className="rounded-full" />
					</div>

					<div className="flex-1 max-w-full">
						<div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
							<span className="font-medium">{comment?.by}</span>
							<Clock className="w-4 h-4" />
							<span>{formatDate(comment?.time)}</span>
						</div>

						{comment?.text && (
							<div
								style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
								className="text-gray-800 text-sm leading-relaxed text-pretty break-words max-w-full"
								dangerouslySetInnerHTML={{ __html: comment?.text }}
							/>
						)}
						<div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
							<div className="flex items-center space-x-1">
								<span className="font-medium text-primary text-lg">{comment?.score || 0}</span>
								<span>points</span>
							</div>
							<div className="flex items-center space-x-1">
								<MessageCircle className="w-4 h-4" />
								<span>{comment?.kids?.length || 0} </span>
							</div>
						</div>
						{totalReplies > 0 && parentRepliesVisible && (
							<button
								onClick={() => setShowReplies(!showReplies)}
								className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-600 transition"
								aria-expanded={showReplies}
								aria-controls={`replies-${comment.id}`}
							>
								{showReplies ? (
									<>
										<ChevronDown className="w-4 h-4" />
										Hide replies
									</>
								) : (
									<>
										<ChevronRight className="w-4 h-4" />
										Show {totalReplies} repl{totalReplies > 1 ? 'ies' : 'y'}
									</>
								)}
							</button>
						)}
					</div>
				</div>
			</div>

			<AnimatePresence initial={false}>
				{showReplies && childComments.length > 0 && (
					<motion.div
						id={`replies-${comment.id}`}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25 }}
						className="mt-3 overflow-hidden"
					>
						{childComments.map((child) => (
							<Comment
								key={child.id}
								commentId={child.id}
								level={level + 1}
								parentRepliesVisible={showReplies}
							/>
						))}

						{/* Show More Replies Button */}
						{totalReplies > visibleReplyCount && (
							<div className="mt-2 ml-6">
								<button
									onClick={() => setVisibleReplyCount((prev) => prev + 5)}
									className="text-sm text-gray-600 hover:text-orange-600 underline"
								>
									Show more replies ({totalReplies - visibleReplyCount} more)
								</button>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
