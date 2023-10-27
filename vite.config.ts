import {defineConfig} from 'vite';
import path from 'path';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@styles',
        replacement: path.resolve(__dirname, './src/styles'),
      },
      {
        find: /^@html\/(.+)(\?raw)?$/,
        replacement: path.resolve(__dirname, './src/html/$1?raw'),
      },
      {
        find: '@includes',
        replacement: path.resolve(__dirname, './src/includes'),
      },
    ],
  },
});