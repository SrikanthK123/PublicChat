import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PublicChat',  // Ensure this matches your GitHub Pages repository path
  build: {
    outDir: 'dist',  // Output directory for the build files
  },
});
