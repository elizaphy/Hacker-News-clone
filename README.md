# Hacker-News-clone

A modern, responsive Hacker News clone built with React, Vite, and Tailwind CSS. This application provides a clean interface to browse top stories, new stories and Best stories, view detailed posts, and read threaded comments from the Hacker News API.

## 🚀 Features

- **Browse Top Stories**: Paginated list of top Hacker News stories
- **Post Details**: Full post view with content and metadata
- **Threaded Comments**: Nested comment system with collapsible replies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Data**: Live data from the official Hacker News API
- **Modern UI**: Clean, intuitive interface with smooth transitions

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **date-fns** - Date formatting utilities
- **Lucide React** - Beautiful icons

## 📋 Prerequisites

- **Node.js**: Version 22 or higher
- **npm**: Version 8 or higher

## 🚀 Getting Started

### Installation

1. **Clone the repository**

    ```bash
    git clone <https://github.com/elizaphy/Hacker-News-clone>
    cd hacker-news-clone
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

1. **Build the application**

    ```bash
    npm run build
    ```

2. **Preview the production build**
    ```bash
    npm run preview
    ```

## 📖 Usage

### Home Page

- Browse through highline posts top stories, new stories and bast stories from Hacker News
- Click on any story to view its details
- Click the external link icon to visit the original source

### Post Page

- Browse through the latest top stories, new stories and bast stories from Hacker News
- Use pagination to navigate through more stories
- Click on any story to view its details
- Click the external link icon to visit the original source

### Post Detail Page

- View the full post with title, image, and metadata
- Read threaded comments with nested replies
- Visit the original link if available
- 
### Comments Page

- List now latest new comments
- Read threaded comments with nested replies
- Visit detail comments with nested replies

### Features

- **Responsive Design**: Works seamlessly on all device sizes
- **Loading States**: Smooth loading indicators while fetching data
- **Error Handling**: Graceful error messages for failed requests
- **Caching**: Intelligent data caching for better performance

## 🌐 API Integration

This application uses the official Hacker News API:

- **Base URL**: `https://hacker-news.firebaseio.com/v0`
- **Endpoints Used**:
    - `/{type}.json` - topstories, newstories, basestories IDs
    - `/item/{id}.json` - Individual item details

## 🎨 Design Decisions

- **Color Scheme**: Orange accent (#ff6600) matching Hacker News branding
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Card-based design for modern appeal
- **Interactions**: Subtle hover effects and smooth transitions
- **Responsiveness**: Mobile-first approach with Tailwind breakpoints

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Hacker News](https://news.ycombinator.com/) for providing the API
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
