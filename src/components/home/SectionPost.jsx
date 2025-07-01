import NewsSection from '@components/NewsSection';
import { fetchStoryIds, fetchStoryItem } from '@services/hackerNewsApi';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PREVIEW_ITEMS = 5;

export default function SectionPost() {
	const navigate = useNavigate();
	const sectionRef = useRef(null);

	// --- Fetch story ID lists ---
	const { data: topStoryIds = [], isLoading: topLoading } = useQuery({
		queryKey: ['topStories'],
		queryFn: () => fetchStoryIds('topstories'),
		staleTime: 5 * 60 * 1000,
	});

	const { data: bestStoryIds = [], isLoading: bestLoading } = useQuery({
		queryKey: ['bestStories'],
		queryFn: () => fetchStoryIds('beststories'),
		staleTime: 5 * 60 * 1000,
	});

	const { data: newStoryIds = [], isLoading: newLoading } = useQuery({
		queryKey: ['newStories'],
		queryFn: () => fetchStoryIds('newstories'),
		staleTime: 5 * 60 * 1000,
	});

	// --- Fetch story preview data (first 6 stories) ---
	const { data: topStories = [], isLoading: topStoriesLoading } = useQuery({
		queryKey: ['topStoriesData'],
		queryFn: async () => {
			const storyPromises = topStoryIds.slice(0, 6).map((id) => fetchStoryItem(id));
			const stories = await Promise.all(storyPromises);
			return stories.filter((story) => story && story.title);
		},
		enabled: topStoryIds?.length > 0,
		staleTime: 2 * 60 * 1000,
	});

	const { data: bestStories = [], isLoading: bestStoriesLoading } = useQuery({
		queryKey: ['bestStoriesData'],
		queryFn: async () => {
			const storyPromises = bestStoryIds.slice(0, PREVIEW_ITEMS).map((id) => fetchStoryItem(id));
			const stories = await Promise.all(storyPromises);
			return stories.filter((story) => story && story.title);
		},
		enabled: bestStoryIds?.length > 0,
		staleTime: 2 * 60 * 1000,
	});

	const { data: newStories = [], isLoading: newStoriesLoading } = useQuery({
		queryKey: ['newStoriesData'],
		queryFn: async () => {
			const storyPromises = newStoryIds.slice(0, 6).map((id) => fetchStoryItem(id));
			const stories = await Promise.all(storyPromises);
			return stories.filter((story) => story && story.title);
		},
		enabled: newStoryIds.length > 0,
		staleTime: 2 * 60 * 1000,
	});

	// --- Navigate to full list ---
	const handleMoreClick = (type) => {
		navigate(`/posts?type=${type}`);
	};
	return (
		<section ref={sectionRef} className="scroll-mt-20 space-y-12">
			<NewsSection
				title="Best Stories"
				type="best"
				storyIds={bestStoryIds}
				isLoading={bestLoading || bestStoriesLoading}
				stories={bestStories}
				onMoreClick={handleMoreClick}
			/>

			<NewsSection
				title="New Stories"
				type="new"
				storyIds={newStoryIds}
				isLoading={newLoading || newStoriesLoading}
				stories={newStories}
				onMoreClick={handleMoreClick}
			/>

			<NewsSection
				title="Top Stories"
				type="top"
				storyIds={topStoryIds}
				isLoading={topLoading || topStoriesLoading}
				stories={topStories}
				onMoreClick={handleMoreClick}
			/>
		</section>
	);
}
