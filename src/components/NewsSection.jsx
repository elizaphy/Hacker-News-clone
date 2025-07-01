import { ArrowRight } from 'lucide-react';
import { CardSlideInMotion } from './Motion';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import { useNavigate } from 'react-router-dom';

export default function NewsSection({ title, type, isLoading, stories = [], onMoreClick }) {
	const data = stories.map((post) => ({
		...post,
		image: `https://picsum.photos/seed/${post.id}/300/180`,
	}));
	const navigate = useNavigate();

	return (
		<>
			<div className="flex items-center justify-between mb-4 border-b border-orange-500">
				<h2 className="text-xl font-bold text-primary">{title}</h2>
				<a
					className="text-sm text-orange-400 hover:text-primary cursor-pointer flex items-center gap-2"
					onClick={() => onMoreClick(type)}
				>
					View More <ArrowRight className="w-4 h-4" />
				</a>
			</div>

			{isLoading ? (
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<NewsCardSkeleton key={i} />
					))}
				</div>
			) : (
				<>
					{type === 'best' ? (
						<div className="grid lg:grid-cols-5 gap-4">
							{/* First card - large */}

							<div className="lg:col-span-3">
								{data[0] && (
									<CardSlideInMotion delay={0.2} className="m-0 h-full" key={`best-${data[0].id}`}>
										<NewsCard
											key={data[0].id}
											post={data[0]}
											highlight
											big
											onClick={() => navigate(`/post/${data[0].id}`)}
										/>
									</CardSlideInMotion>
								)}
							</div>
							{/* Next 3 cards - smaller grid */}
							<div className="lg:col-span-2 grid grid-cols-1 gap-4">
								{data.slice(1, 4).map((post, index) => (
									<CardSlideInMotion
										delay={0.1 * index}
										className="m-0 h-full"
										key={`best-${post.id}`}
									>
										<NewsCard
											key={post.id}
											post={post}
											index={index}
											onClick={() => navigate(`/post/${post.id}`)}
											listRow
										/>
									</CardSlideInMotion>
								))}
							</div>
						</div>
					) : type === 'new' ? (
						<div className="grid md:grid-cols-2 gap-4">
							{data.map((post, index) => (
								<CardSlideInMotion delay={0.05 * index} duration={1.5} key={`${title}-${index}`}>
									<NewsCard
										post={post}
										onClick={() => navigate(`post/${post.id}`)}
										index={index}
										listRow
									/>
								</CardSlideInMotion>
							))}
						</div>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{data.map((post, index) => (
								<CardSlideInMotion delay={0.05 * index} duration={1.5} key={`${title}-${index}`}>
									<NewsCard post={post} onClick={() => navigate(`post/${post.id}`)} index={index} />
								</CardSlideInMotion>
							))}
						</div>
					)}
				</>
			)}
		</>
	);
}
