export default function NewsCardSkeleton({ isRow }) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-2 animate-pulse">
			<div className={`${isRow ? 'flex-row' : 'flex-col'} w-full flex items-start justify-between gap-2`}>
				<div className={`${isRow ? 'w-50' : 'w-full h-60'} h-30 bg-gray-200 rounded `} />
				<div className="flex-1 space-y-3">
					<div className="h-5 bg-gray-200 rounded w-3/4" />
					<div className="flex space-x-4">
						<div className="h-4 bg-gray-200 rounded w-10" />
						<div className="h-4 bg-gray-200 rounded w-16" />
						<div className="h-4 bg-gray-200 rounded w-20" />
						<div className="h-4 bg-gray-200 rounded w-24" />
					</div>
					<div className="h-4 bg-gray-100 rounded w-1/3" />
				</div>
				{/* <div className="w-6 h-6 bg-gray-200 rounded-full ml-4" /> */}
			</div>
		</div>
	);
}
