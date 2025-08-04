import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// import './App.css';
import Home from './pages/Home';
import './styles/index.css';
import Comments from '@pages/Comments';
import { useEffect } from 'react';
import Login from '@pages/Login';
import Post from '@pages/Post';
import PostDetail from '@pages/PostDetail';
import { ScrollToTop } from '@components/ui/ScrollToTop';

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts" element={<Post />} />
					<Route path="/post/:id" element={<PostDetail />} />
					<Route path="/comments" element={<Comments />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}

export default App;
