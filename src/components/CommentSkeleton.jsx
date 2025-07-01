export function CommentSkeleton() {
	return (
		<div className="flex gap-4 items-start animate-pulse py-4 ">
			<div className="w-8 h-8 rounded-full bg-gray-200"></div>
			<div className="flex-1 space-y-2">
				<div className="h-4 w-1/3 bg-gray-200 rounded"></div>
				<div className="h-3 w-full bg-gray-200 rounded"></div>
				<div className="h-3 w-5/6 bg-gray-200 rounded"></div>
			</div>
		</div>
	);
}
