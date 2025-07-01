import BaseButton from '@components/ui/Button';

export default function Login() {
	return (
		<>
			<section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 text-gray-800 px-4 ">
				<div className="min-w-2xl mx-auto ">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h1>

						<form className="space-y-6">
							<div>
								<label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
									Username
								</label>
								<input
									type="text"
									id="username"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
									placeholder="Enter your username"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
									Password
								</label>
								<input
									type="password"
									id="password"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
									placeholder="Enter your password"
								/>
							</div>

							<BaseButton type="submit" variant="primary" className="w-full ">
								Login
							</BaseButton>
						</form>

						<div className="mt-6 text-center">
							<a href="#" className="text-sm text-orange-600 hover:text-orange-700">
								Create Account
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
