import { useParams, useNavigate } from 'react-router-dom';

import { ArrowLeft, ExternalLink, User, Clock, MessageCircle } from 'lucide-react';
import { getStoryDetail } from '@services/hackerNewsApi';
import { formatDate } from '@utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import SkeletonDetail from '@components/SkeletonDetail';
import { Comment } from '@components/Comment';
import BaseImage from '@components/ui/Image';
import { useState } from 'react';
import BaseButton from '@components/ui/Button';

const PostDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [visibleComments, setVisibleComments] = useState(5);
	const {
		data: post,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['storyDetail', id],
		queryFn: () => getStoryDetail(id),
		enabled: !!id,
	});

	const getAvatarUrl = `https://i.pravatar.cc/100?u=${encodeURIComponent(post?.by)}`;
	if (isLoading) {
		return (
			<div className="min-h-screen bg-background">
				<div className="max-full mx-auto px-4 py-8">
					<SkeletonDetail />
				</div>
			</div>
		);
	}

	if (isError || !post) {
		return (
			<div className="min-h-screen bg-background pt-10">
				<div className="max-w-4xl mx-auto px-4 py-8">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
						<p className="text-gray-600 mb-6">{isError || 'Post not found'}</p>
						<button
							onClick={() => navigate('/')}
							className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
						>
							Go Back Home
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background md:pt-14">
			<div className="container mx-auto px-4 py-8">
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
					{post?.type !== 'comment' ? (
						<>
							<p className="text-xl md:text-2xl lg:text-3xl font-bold text-text mb-4">{post.title}</p>
							{/* Featured Image (Fake from Unsplash) */}
							<div className="h-[400px] lg:h-[500px] w-full bg-gray-200">
								<img
									src={`https://picsum.photos/seed/${post?.id}/800/400`}
									alt={post.title}
									className="w-full h-full object-cover rounded-md mb-6"
									onError={(e) => (e.target.style.display = 'none')}
								/>
							</div>
							{post?.url && (
								<a
									href={post?.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center space-x-2 text-primary hover:text-orange-700 mb-4 mt-2"
								>
									<ExternalLink className="w-4 h-4" />
									<span>Visit Original Link</span>
								</a>
							)}
							<div className="flex items-center space-x-6 text-sm text-text-gray mb-6">
								<div className="flex items-center space-x-1">
									<span className="font-medium text-primary text-lg">{post?.score || 0}</span>
									<span>points</span>
								</div>

								<div className="flex items-center space-x-1">
									<User className="w-4 h-4" />
									<span>{post?.by}</span>
								</div>

								<div className="flex items-center space-x-1">
									<Clock className="w-4 h-4" />
									<span>{formatDate(post?.time)}</span>
								</div>

								<div className="flex items-center space-x-1">
									<MessageCircle className="w-4 h-4" />
									<span>
										{post?.type === 'comment' ? post?.kids?.length : post?.descendants || 0}{' '}
									</span>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="flex gap-4 items-start py-4">
								<div className="w-10 h-10 overflow-hidden rounded-full">
									<BaseImage
										src={getAvatarUrl}
										alt={post?.by}
										rounded="full"
										className="rounded-full"
									/>
								</div>
								<div className="flex-1">
									<div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
										<span className="font-medium">{post?.by}</span>
										<Clock className="w-4 h-4" />
										<span>{formatDate(post?.time)}</span>
									</div>

									{post?.text && (
										<div
											style={{ wordBreak: 'break-word' }}
											className="text-gray-800 text-sm leading-relaxed text-pretty break-words"
											dangerouslySetInnerHTML={{ __html: post?.text }}
										/>
									)}
									<div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
										<div className="flex items-center space-x-1">
											<span className="font-medium text-primary text-lg">{post?.score || 0}</span>
											<span>points</span>
										</div>
										<div className="flex items-center space-x-1">
											<MessageCircle className="w-4 h-4" />
											<span>
												{post?.type === 'comment'
													? post?.kids?.length
													: post.descendants || 0}{' '}
											</span>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>

				{post?.kids && post?.kids?.length > 0 && (
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
						<h2 className="text-xl font-semibold text-gray-900 mb-6">
							Comments ({post?.descendants || post?.kids?.length})
						</h2>

						<div className="space-y-4">
							{post.kids.slice(0, visibleComments).map((commentId) => (
								<Comment key={commentId} commentId={commentId} />
							))}
						</div>
					</div>
				)}
				{post?.kids?.length > visibleComments && (
					<div className="mt-4 text-center">
						<BaseButton onClick={() => setVisibleComments((prev) => prev + 10)} className="text-sm ">
							{isLoading ? 'Loading...' : 'Load More'}
						</BaseButton>
					</div>
				)}
			</div>
		</div>
	);
};
export default PostDetail;
