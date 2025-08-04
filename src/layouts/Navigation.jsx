import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const menu = [
	{ label: 'posts', path: '/posts' },
	{ label: 'comments', path: '/comments' },
];

export default function Navigation() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [activeSection, setActiveSection] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [scrollUp, setScrollUp] = useState(true);
	const [lastScroll, setLastScroll] = useState(0);
	const [isDark, setIsDark] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
	});

	// On mount: check saved theme or OS preference
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setIsDark(savedTheme === 'dark');
		} else {
			const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setIsDark(userPref);
		}
	}, []);

	// Update document class & localStorage on toggle
	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleScroll = () => {
			setShowDropdown(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [activeSection]);

	// Hide navbar on scroll down, show on scroll up
	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;

			if (currentScroll > lastScroll && currentScroll > 60) {
				setScrollUp(false); // Scroll down → hide navbar
			} else {
				setScrollUp(true); // Scroll up → show navbar
			}

			setLastScroll(currentScroll);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScroll]);

	return (
		<header
			className={`relative md:fixed w-full transition-transform duration-300 ${showDropdown ? 'bg-white shadow sticky top-0 z-50' : 'sticky top-0 z-50'} ${scrollUp ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}
		>
			<div className="container mx-auto">
				<div className="flex items-center justify-between px-4 py-3">
					<NavLink
						to="/"
						className={`${showDropdown ? 'scale-none' : 'scale-110'} transition-transform duration-300 text-primary text-xl font-bold flex flex-row items-center gap-2`}
					>
						<img
							alt="logo"
							className="w-10 h-10 hover:scale-105 transition duration-200 "
							src="/assets/images/react.svg"
						/>
						Hacker News
					</NavLink>

					<nav className="hidden md:flex gap-4 flex-wrap text-md justify-center items-center">
						{menu.map((item) => (
							<NavLink
								onClick={() => setActiveSection(item.path)}
								key={item.path}
								to={item.path}
								className={({ isActive }) =>
									`relative capitalize text-text hover:text-primary transition p-0 ${
										isActive ? 'text-primary font-medium' : 'text-text'
									}`
								}
							>
								{item.label}
								{/* underline on hover and active */}
								<span
									className={`
										absolute -bottom-2 left-0 h-0.5 w-full rounded 
										bg-gradient-to-r from-orange-500 to-pink-500 
										transition-opacity duration-300
										${
											activeSection === item || window.location.pathname === item.path
												? 'opacity-100'
												: 'opacity-0 group-hover:opacity-100'
										}
										`}
								/>
							</NavLink>
						))}
						<button
							aria-label="Toggle dark mode"
							onClick={() => setIsDark(!isDark)}
							className="!bg-transparent !border-0 p-0 focus:!outline-none focus:ring-0"
						>
							{isDark ? (
								<Sun className="w-5 h-5 text-yellow-400" />
							) : (
								<Moon className="w-5 h-5 text-yellow-400" />
							)}
						</button>
						{/* <NavLink
							to="/login"
							className="text-primary ml-2 font-medium border px-5 py-1 rounded-lg bg-white hover:bg-orange-600 hover:text-white transition duration-200 ease-in-out"
						>
							login
						</NavLink> */}
					</nav>

					{/* Mobile dark mode */}

					<div className="absolute top-3 right-18  md:hidden">
						<button
							aria-label="Toggle dark mode"
							onClick={() => setIsDark(!isDark)}
							className="!bg-transparent !border-0 p-0 focus:!outline-none focus:ring-0"
						>
							{isDark ? (
								<Sun className="w-5 h-5 text-yellow-400" />
							) : (
								<Moon className="w-5 h-5 text-yellow-400" />
							)}
						</button>
					</div>

					{/* Mobile Menu Button */}
					<div className="absolute top-3 right-3 flex items-center md:hidden">
						<button
							onClick={toggleMenu}
							type="button"
							className="relative inline-flex items-center justify-center rounded-md p-1 text-text focus:outline-hidden"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="absolute -inset-0.5"></span>
							<span className="sr-only">Open main menu</span>
							{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</button>
					</div>
					{/* Mobile Menu show/hide based on menu state*/}
				</div>
			</div>
			{isOpen && (
				<div className="sm:hidden animate-slide-down absolute bg-white w-full shadow-md" id="mobile-menu">
					<div className="container">
						<div className="flex flex-col gap-4 p-4">
							{menu.map((item) => (
								<NavLink
									onClick={() => setActiveSection(item)}
									key={item.path}
									to={item.path}
									className={({ isActive }) =>
										`relative capitalize text-text hover:text-primary transition p-0 ${
											isActive ? 'text-primary font-medium' : 'text-text'
										}`
									}
								>
									{item.label}
									{/* underline on hover and active */}
									<span
										className={`
									absolute -bottom-2 left-0 h-0.5 w-full rounded 
									bg-gradient-to-r from-orange-500 to-pink-500 
									transition-opacity duration-300
									${
										activeSection === item || window.location.pathname === item.path
											? 'opacity-100'
											: 'opacity-0 group-hover:opacity-100'
									}
									`}
									/>
								</NavLink>
							))}
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
