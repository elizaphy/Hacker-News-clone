import Hero from '@components/jobs/Hero';
import JobLists from '@components/jobs/JobLists';

export default function Jobs() {
	return (
		<>
			<Hero />
			<div className="container mx-auto px-4 py-6">
				<JobLists />
			</div>
		</>
	);
}
