import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  base: '/alfaizkhan-portfolio/',

  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json'
    ],

    alias: {
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, './data'),
      '@config': path.resolve(__dirname, './config')
    }
  },

  server: {
    port: 5173,
    host: true
  }
});