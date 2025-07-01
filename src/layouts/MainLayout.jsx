import Navigation from './navigation';
import Footer from './Footer';

export default function MainLayout({ children }) {
	return (
		<div className="min-h-screen w-full dark:bg-neutral-900">
			<Navigation />
			<main className="min-h-screen ">{children}</main>
			<Footer />
		</div>
	);
}
