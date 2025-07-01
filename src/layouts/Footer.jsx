import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = ['FAQ', 'News', 'Contact'];
const social = [
	{
		icon: <Facebook />,
		title: 'facebook',
		link: '',
	},
	{
		icon: <Linkedin />,
		title: 'linkIn',
		link: '',
	},
	{
		icon: <Instagram />,
		title: 'linkIn',
		link: '',
	},
];

export default function Footer() {
	return (
		<section className="bg-gradient">
			<footer className="container mx-auto py-8 text-gray-600 ">
				<div className="flex flex-col lg:flex-row justify-between items-center gap-4">
					<div className="">
						<NavLink to="/" className={` text-primary text-xl font-bold flex flex-row items-center gap-2`}>
							<img
								alt="logo"
								className="w-10 h-10 hover:scale-105 transition duration-200 "
								src="/assets/images/react.svg"
							/>
							Hacker News
						</NavLink>
					</div>
					<div className="flex flex-col gap-5">
						<div className="max-w-lg mx-auto">
							<label>Subscription </label>
							<form className="flex flex-row items-center gap-3">
								<input
									type="email"
									placeholder="Enter your email"
									className="w-full flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
									required
								/>
								<button
									type="submit"
									className="px-6 py-2 !bg-primary text-white font-semibold rounded-md hover:bg-orange-600 transition"
								>
									Subscribe
								</button>
							</form>
						</div>
					</div>
				</div>
			</footer>
			<div className="bg-primary py-4">
				<div className="container mx-auto text-center text-white">
					<p>@2025 Hacker News Media Co.,Ltd. All Rights Reserved</p>
				</div>
			</div>
		</section>
	);
}
