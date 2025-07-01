import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// import './App.css';
import Home from './pages/Home';
import './styles/index.css';
import { PostDetail } from './pages/PostDetail';
import Comments from '@pages/Comments';
import Jobs from '@pages/Jobs';
import { useEffect } from 'react';
import Login from '@pages/Login';
import Post from '@pages/Post';

function App() {
	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts" element={<Post />} />
					<Route path="/post/:id" element={<PostDetail />} />
					<Route path="/comments" element={<Comments />} />
					<Route path="/jobs" element={<Jobs />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}

export default App;
