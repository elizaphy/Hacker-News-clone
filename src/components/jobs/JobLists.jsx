import NewsCardSkeleton from '@components/NewsCardSkeleton';
import Card from '@components/ui/Card';
import { fetchJobs } from '@services/hackerNewsApi';
import { useQuery } from '@tanstack/react-query';
import { domainFromUrl } from '@utils/domainFromUrl';
import { useEffect, useState } from 'react';

const LIMIT = 10;

export default function JobLists() {
	const [page, setPage] = useState(1);
	const [allJobs, setAllJobs] = useState([]);

	const offset = (page - 1) * LIMIT;

	const {
		data = [],
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ['jobs', page],
		queryFn: () => fetchJobs('jobstories', LIMIT, offset),
		keepPreviousData: true,
	});

	// ✅ Append jobs when new data comes in
	useEffect(() => {
		if (data?.length > 0) {
			const enhancedJobs = data
				.filter((j) => !allJobs.some((p) => p.id === j.id)) // avoid duplicates
				.map((job) => {
					const locationMatch =
						job?.text?.match(/Location:\s*<\/?b?>?([^\n<]+)/i) || // Match "Location: Cambodia"
						job?.text?.match(/(Remote|On[-\s]?site|Hybrid)/i) || // Match "Remote", "Hybrid", etc.
						job?.text?.match(/(?:in|at)\s([A-Z][a-zA-Z]+(?:,\s?[A-Z][a-zA-Z]+)?)/i); // "in London", "at New York"
					const location = locationMatch?.[1]?.trim() || 'Unknown location';
					const logo = `https://logo.clearbit.com/${domainFromUrl(job.url)} ` || `/assets/images/default.png`;

					return { ...job, logo, location };
				});

			setAllJobs((prev) => [...prev, ...enhancedJobs]);
		}
	}, [data]);

	return (
		<>
			<div className="grid grid-cols-1 gap-4">
				{allJobs.map((job, index) => (
					<Card post={job} key={index} index={index} />
				))}
			</div>
			<button
				onClick={() => setPage((p) => p + 1)}
				className="px-6 py-2 bg-primary text-white rounded hover:bg-orange-600 transition"
				disabled={isFetching}
			>
				{isFetching ? 'Loading...' : 'Load More'}
			</button>
		</>
	);
}
