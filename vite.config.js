import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/postcss';
import viteCompression from 'vite-plugin-compression';

// Convert ESM meta URL to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	build: {
		target: 'esnext',
		outDir: 'dist',
		minify: 'esbuild',
		cssCodeSplit: true,
		sourcemap: false,
		chunkSizeWarningLimit: 500,
	},
	resolve: {
		alias: {
			'@services': path.resolve(__dirname, './src/services'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://api.example.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
		https: false,
		port: 3000,
		open: true,
		strictPort: true,
	},
	css: {
		postcss: {
			plugins: [tailwindcss],
		},
	},
	optimizeDeps: {
		include: ['react', 'react-dom', '@tanstack/react-query', 'dompurify'],
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	},

	plugins: [
		react(),
		viteCompression({
			algorithm: 'brotliCompress',
			ext: '.br',
			threshold: 10240,
		}),
	],
});
