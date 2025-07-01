export default function SkeletonDetail() {
	return (
		<div className="p-6 max-w-full mx-auto space-y-4 animate-pulse">
			<div className="h-8 bg-gray-200 rounded w-full" />
			<div className="h-4 bg-gray-200 rounded w-full" />
			<div className="h-64 bg-gray-300 rounded w-full" />
			<div className="space-y-2 mt-6">
				<div className="h-4 bg-gray-200 rounded w-full" />
				<div className="h-4 bg-gray-200 rounded w-11/12" />
				<div className="h-4 bg-gray-200 rounded w-10/12" />
				<div className="h-4 bg-gray-200 rounded w-2/3" />
			</div>
		</div>
	);
}
