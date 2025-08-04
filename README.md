# Hacker-News-clone

A modern, responsive Hacker News clone built with React, Vite, and Tailwind CSS. This application provides a clean interface to browse top stories, new stories and Best stories, view detailed posts, and read threaded comments from the Hacker News API.

## 🚀 Features

- **Browse Hacker News Stories**: Top, New, and Best stories with pagination
- **Post Details**: View full post content with title, metadata, and external link
- **Threaded Comments**: Nested, collapsible replies for better readability
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Live Data**: Real-time data from the official Hacker News API
- **Modern UI**: Clean interface with subtle hover effects and smooth transitions
- **Loading States & Error Handling**: User feedback during data fetch or failure
- **Data Caching**: Faster load with intelligent data caching

## 🛠️ Tech Stack

- **React 18** – Functional components and hooks
- **Vite** – Lightning-fast bundler and dev server
- **Tailwind CSS** – Utility-first styling
- **TypeScript** – Type-safe development
- **React Router** – Client-side routing
- **TanStack Query** – Data fetching and caching
- **date-fns** – Lightweight date utilities
- **Lucide React** – Clean, customizable icons

## 📋 Prerequisites

- **Node.js**: Version 22 or higher
- **npm**: Version 8 or higher

## 🌐 API Integration

This application uses the official Hacker News API:

- **Base URL**: `https://hacker-news.firebaseio.com/v0`
- **Endpoints Used**:
    - `/{type}stories.json` — IDs for top, new, or best stories
    - `/item/{id}.json` — Fetch details of a post, comment, or job


## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
    git clone https://github.com/elizaphy/Hacker-News-clone
    cd Hacker-News-clone

2. **Install dependencies**

    ```bash
    npm install
> 🔐 **Note**: Before running or committing code, ensure you have a valid `.env` file in place if 

> # Example .env
    VITE_API_BASE_URL=https://hacker-news.firebaseio.com/v0

> ## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Home Page

- Browse through highline posts top stories, new stories and bast stories from Hacker News
- Click on any story to view its details
- Click the external link icon to visit the original source

### Post Page

- Browse through the latest top stories, new stories and best stories from Hacker News
- Use pagination to navigate through more stories
- Click on any story to view its details
- Click the external link icon to visit the original source

### Post Detail Page

- View the full post with title, image, and metadata
- Read threaded comments with nested replies
- Visit the original link if available
  
### Comments Page

- List latest comments
- Read threaded comments with nested replies
- Visit detail comments with nested replies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b new-branch`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin master`)
5. Open a Pull Request

