import { Comment } from '@components/Comment';
import { CommentSkeleton } from '@components/CommentSkeleton';
import BaseButton from '@components/ui/Button';
import { fetchLatestComments } from '@services/hackerNewsApi';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CommentList() {
	const navigate = useNavigate();
	const [offset, setOffset] = useState(0);
	const [allComments, setAllComments] = useState([]);
	const LIMIT = 20;

	const {
		data: latestComments = [],
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ['latest-comments', offset],
		queryFn: () => fetchLatestComments(LIMIT, offset),
		keepPreviousData: true,
		staleTime: 60 * 1000,
		refetchInterval: 30 * 1000,
	});

	// Merge new data with existing, avoid duplicates
	useEffect(() => {
		if (latestComments.length) {
			setAllComments((prev) => {
				const existing = new Map(prev.map((c) => [c.id, c]));
				latestComments.forEach((c) => {
					existing.set(c.id, c);
				});
				return Array.from(existing.values()).sort((a, b) => b.time - a.time);
			});
		}
	}, [latestComments]);

	const loadMore = () => setOffset((prev) => prev + LIMIT);

	return (
		<section className="mt-8">
			<h2 className="text-xl font-bold mb-4 text-orange-600">Latest Top Comments</h2>

			<div className="space-y-4">
				<AnimatePresence>
					{allComments.map((comment) => (
						<motion.div
							key={comment.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={() => navigate(`/post/${comment.id}`)}
							className="cursor-pointer"
						>
							<Comment commentId={comment.id} parentRepliesVisible={false} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Skeletons */}
			{isLoading && Array.from({ length: 5 }).map((_, idx) => <CommentSkeleton key={idx} />)}

			{/* Load More */}
			{!isLoading && (
				<div className="flex justify-center mt-6">
					<BaseButton
						onClick={loadMore}
						disabled={isFetching}
						className="btn !bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
					>
						{isFetching ? 'Loading...' : 'Load More'}
					</BaseButton>
				</div>
			)}
		</section>
	);
}
