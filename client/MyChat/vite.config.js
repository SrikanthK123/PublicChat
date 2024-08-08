import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/PublicChat', // Set this to './' or remove it entirely
  build: {
    outDir: 'dist',
  },
 /* server: {
    proxy: {
      '/api' : 'http://localhost:4000'
    }
  }*/
});

