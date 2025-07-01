const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStoryIds = async (type) => {
	const res = await fetch(`${BASE_URL}/${type}.json?print=pretty`);
	return res.json();
};

export const fetchStoryItem = async (id) => {
	const res = await fetch(`${BASE_URL}/item/${id}.json?print=pretty`);
	return res.json();
};

export const fetchJobs = async (type, limit = 10, offset = 0) => {
	const ids = await fetchStoryIds(type);
	const sliced = ids.slice(offset, offset + limit);
	return Promise.all(sliced.map(fetchStoryItem));
};

export async function getStoryDetail(id) {
	return fetchStoryItem(id);
}

export async function getComment(id) {
	return fetchStoryItem(id);
}

export const fetchLatestComments = async (limit = 10, offset = 0) => {
	// Step 1: Get story IDs from newstories or topstories
	const res = await fetch(`${BASE_URL}newstories.json`);
	const storyIds = await res.json();

	// Step 2: Fetch a slice of stories
	const slicedStoryIds = storyIds.slice(offset, offset + 20); // oversample
	const stories = await Promise.all(slicedStoryIds.map(fetchStoryItem));

	// Step 3: Gather all top-level comment IDs from those stories
	let commentIds = stories.flatMap((story) => (story?.kids ? story.kids : []));
	commentIds = [...new Set(commentIds)]; // deduplicate

	// Step 4: Fetch comment details
	const comments = await Promise.all(commentIds.slice(0, 50).map(fetchStoryItem));

	// Step 5: Filter valid comments and sort by newest
	const validComments = comments
		.filter((c) => c && c.type === 'comment' && !c.deleted && !c.dead)
		.sort((a, b) => b.time - a.time);

	// Step 6: Slice to final limit
	return validComments.slice(0, limit);
};
