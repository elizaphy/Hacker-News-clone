import { Link } from 'react-router-dom';
import { Clock, ExternalLink, Link2, MapPin, MessageCircle, User } from 'lucide-react';
import { formatDate } from '@utils/formatDate';
import BaseImage from './Image';

export default function Card({ post, onClick, isLoading }) {
	return (
		<div className="card group " onClick={onClick}>
			<div className={`flex items-start justify-between gap-2 md:gap-3 h-full overflow-hidden `}>
				<div className={`max-w-2xs max-h-2xs overflow-hidden rounded-lg `}>
					{post?.id && post.logo ? (
						<BaseImage
							src={post.logo}
							// className={`w-full h-full bg-gray-200 object-cover transition-transform duration-300 ease-in-out `}
							alt="thumbnail"
							loading="lazy"
							objectFit="cover"

							// onError={(e) => (e.target.src = `/assets/images/default.png`)}
						/>
					) : (
						<div className="w-[200px] h-[120px] bg-gray-200 animate-pulse rounded" />
					)}
				</div>
				<div className={`flex-1 flex flex-col flex-grow w-full p-2 text-wrap`}>
					<div className="h-full">
						<h2 onClick={onClick} className={`card-title`}>
							{post.title}
						</h2>
						<div className="flex  items-center text-sm mb-1 space-x-4">
							{post.location && (
								<a
									href={post.url}
									target="_blank"
									rel="noopener noreferrer"
									className=" text-gray-400 hover:text-primary transition-colors flex items-center space-x-1 mt-auto"
									onClick={(e) => e.stopPropagation()}
								>
									<MapPin className="w-4 h-4" />
									<div className="text-sm text-gray-400 hover:text-primary truncate w-full max-w-[140px]">
										{post.location}
									</div>
								</a>
							)}
							{post?.time && (
								<div className="flex items-center gap-4">
									<div className="flex items-center space-x-1">
										<Clock className="w-4 h-4" />
										<span>{formatDate(post?.time)}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
