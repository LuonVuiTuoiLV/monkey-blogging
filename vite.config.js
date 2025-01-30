// vite.config.js
import react from '@vitejs/plugin-react';
import path from 'path'; // Add this import
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@module': path.resolve(__dirname, './src/module'),
		},
	},
});
