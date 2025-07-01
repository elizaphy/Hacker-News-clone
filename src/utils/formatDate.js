import { formatDistanceToNow } from 'date-fns';

export function formatDate(timestamp) {
	const time = formatDistanceToNow(new Date(timestamp * 1000), {
		addSuffix: false,
	});

	const shortTime = time
		.replace(/^about /, '') // remove "about"
		.replace(/^less than a minute/, '1m')
		.replace(/ minutes?/, 'm')
		.replace(/ hours?/, 'h')
		.replace(/ days?/, 'd')
		.replace(/ months?/, 'mo')
		.replace(/ years?/, 'y');

	return shortTime + ' ago';
}
