import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // Ensure this points to your project root
  publicDir: 'public', // Ensure the public directory is correctly configured
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});