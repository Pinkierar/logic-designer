import {defineConfig} from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  resolve: {
    alias: {
      '#includes': path.resolve(__dirname, './src/includes'),
      '#components': path.resolve(__dirname, './src/components'),
      '#styles': path.resolve(__dirname, './src/styles'),
    },
  },
  plugins: [
    react(),
  ],
});