import {defineConfig} from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  resolve: {
    alias: {
      '#app': path.resolve(__dirname, './src/app'),
      '#graphics': path.resolve(__dirname, './src/graphics'),
      '#repositories': path.resolve(__dirname, './src/repositories'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#components': path.resolve(__dirname, './src/components'),
      '#styles': path.resolve(__dirname, './src/styles'),
    },
  },
  plugins: [
    react(),
  ],
});