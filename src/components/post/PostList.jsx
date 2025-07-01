import { CardSlideInMotion } from '@components/Motion';
import NewsCard from '@components/NewsCard';
import NewsCardSkeleton from '@components/NewsCardSkeleton';
import Pagination from '@components/Pagination';
import { fetchStoryIds, fetchStoryItem } from '@services/hackerNewsApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Hero from './Hero';

const ITEMS_PER_PAGE = 21;
export function PostList() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState(searchParams.get('type') || 'top');

	// Fetch story IDs based on filter type
	const { data: storyIds = [], isLoading: idsLoading } = useQuery({
		queryKey: ['storyIds', filterType],
		queryFn: async () => {
			let endpoint = '';
			switch (filterType) {
				case 'best':
					endpoint = 'beststories';
					break;
				case 'new':
					endpoint = 'newstories';
					break;
				default:
					endpoint = 'topstories';
			}
			const response = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
			return response.json();
		},
		staleTime: 5 * 60 * 1000,
	});

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentStoryIds = storyIds.slice(startIndex, endIndex);

	// Fetch stories data
	const { data: stories = [], isLoading: storiesLoading } = useQuery({
		queryKey: ['stories', filterType, currentPage],
		queryFn: async () => {
			const storyPromises = currentStoryIds.map((id) => fetchStoryItem(id));
			const storiesData = await Promise.all(storyPromises);
			const list = storiesData
				.filter((story) => story && story.title)
				.map((story) => ({
					...story,
					image: `https://picsum.photos/seed/${story.id}/300/180`,
				}));
			return list;
		},
		enabled: currentStoryIds.length > 0,
		staleTime: 2 * 60 * 1000,
	});

	// Filter stories based on search term
	const filteredStories = stories.filter(
		(story) =>
			story?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(story?.by && story?.by.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	const totalPages = Math.ceil(storyIds?.length / ITEMS_PER_PAGE);
	const isLoading = idsLoading || storiesLoading;

	const handlePostClick = (postId) => {
		navigate(`/post/${postId}`);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleFilterChange = (newType) => {
		setFilterType(newType);
		setCurrentPage(1);
		setSearchParams({ type: newType });
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const clearSearch = () => {
		setSearchTerm('');
	};

	useEffect(() => {
		const type = searchParams.get('type');
		if (type && ['top', 'best', 'new'].includes(type)) {
			setFilterType(type);
		}
	}, [searchParams]);

	return (
		<div className="min-h-screen ">
			<Hero
				searchTerm={searchTerm}
				onSearchChange={handleSearchChange}
				onClearSearch={clearSearch}
				filterType={filterType}
				onFilterChange={handleFilterChange}
				filteredStories={filteredStories}
			/>
			<div className="container mx-auto px-4 py-6">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{isLoading && (
						<>
							{Array.from({ length: 10 }).map((_, i) => (
								<NewsCardSkeleton key={i} />
							))}
						</>
					)}
					{filteredStories?.length > 0 ? (
						filteredStories.map((post, index) => (
							<CardSlideInMotion delay={0.05 * index} duration={1.5} key={`${post?.id}-${index}`}>
								<NewsCard key={post.id} post={post} onClick={() => handlePostClick(post.id)} />
							</CardSlideInMotion>
						))
					) : (
						<div className="p-8 text-center w-full m-auto col-span-3">
							<p className="text-gray-500">
								{searchTerm ? 'No stories found matching your search.' : 'No stories available.'}
							</p>
						</div>
					)}
				</div>

				{totalPages > 1 && !searchTerm && (
					<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
				)}
			</div>
		</div>
	);
}
