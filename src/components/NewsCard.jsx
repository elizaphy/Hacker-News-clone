import { Link } from 'react-router-dom';
import { Clock, ExternalLink, Link2, MessageCircle, User } from 'lucide-react';
import NewsCardSkeleton from './NewsCardSkeleton';
import { formatDate } from '@utils/formatDate';
import { domainFromUrl } from '@utils/domainFromUrl';
import BaseImage from './ui/Image';
import { clsx } from 'clsx';

export default function NewsCard({ post, onClick, isLoading, big, index = 0, listRow }) {
	if (!post || typeof post.time !== 'number') {
		return null; // or <p>Loading...</p>
	}

	return (
		<>
			{isLoading ? (
				Array.from({ length: 10 }).map((_, i) => <NewsCardSkeleton key={i} />)
			) : (
				<div className="card group " onClick={onClick}>
					<div
						className={`flex flex-col items-start justify-between gap-2 md:gap-3 h-full overflow-hidden ${listRow ? 'flex-row md:flex-row' : 'flex-col md:flex-col'}`}
					>
						<div
							className={`${big ? 'w-full md:w-full min-h-full' : listRow ? 'min-w-[150px] max-w-[150px] w-full' : 'w-full h-[160px] bg-gray-200'} max-h-56 h-auto overflow-hidden rounded-md `}
						>
							{post?.id ? (
								<BaseImage
									src={post.image}
									rounded="lg"
									objectFit="cover"
									className={`${big ? ' md:min-h-[350px] ' : ' md:min-h-auto '} w-[200px] h-[120px] bg-gray-200`}
								/>
							) : (
								<div className="w-[200px] h-[120px] bg-gray-200 animate-pulse rounded" />
							)}
						</div>
						<div
							className={`${big ? 'absolute bottom-1 left-1 px-5 pb-5 min-h-14 bg-linear-to-t from-neutral-500 via-neutral-400/40 to-neutral-400/10 w-full mx-auto' : 'relative'} flex-1 flex flex-col flex-grow w-full p-2 text-wrap`}
						>
							<div className="h-full">
								<h2 onClick={onClick} className={`${big ? '!text-primary' : ''} card-title`}>
									{post.title}
								</h2>
								<div
									className={clsx(
										big ? 'text-white' : ' text-text',
										'flex justify-between items-center text-sm mb-1'
									)}
								>
									{post.url && (
										<a
											href={post.url}
											target="_blank"
											rel="noopener noreferrer"
											className=" hover:text-primary transition-colors flex items-center space-x-1 mt-auto"
											onClick={(e) => e.stopPropagation()}
										>
											<Link2 className="w-4 h-4" />
											<div className=" hover:text-primary truncate w-full max-w-[140px]">
												{domainFromUrl(post.url)}
											</div>
										</a>
									)}
								</div>
							</div>
							<div
								className={clsx(
									big ? 'text-white' : ' text-gray-500',
									'flex flex-wrap md:flex-row items-center justify-between gap-4 text-xs mt-auto w-full h-auto'
								)}
							>
								<div className="flex items-center gap-4">
									{/* <div className="flex items-center space-x-1">
											<User className="w-4 h-4" />
											<span>{post.by}</span>
										</div> */}
									<div className="flex items-center space-x-1">
										<Clock className="w-4 h-4" />
										<span>{formatDate(post?.time)}</span>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<div className="flex items-center space-x-1">
										<span className="font-medium text-primary">{post.score || 0}</span>
										<span>points</span>
									</div>
									<div className="flex items-center space-x-1">
										<MessageCircle className="w-4 h-4" />
										<span>{post.descendants || 0} </span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
