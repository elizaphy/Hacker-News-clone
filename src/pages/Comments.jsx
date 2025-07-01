import { CommentList } from '@components/comments/CommentList';
import Hero from '@components/comments/Hero';

export default function Comments() {
	return (
		<>
			<Hero />
			<div className="container mx-auto px-4 py-6">
				<CommentList />
			</div>
		</>
	);
}
