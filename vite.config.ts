import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 🔥 IMPORTANT FOR GITHUB PAGES + CUSTOM DOMAIN
    base: '/',  

    plugins: [react()],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    define: {
      // 🔥 Only expose what you REALLY need on frontend
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(
        env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || ''
      ),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      emptyOutDir: true,
    },
  };
});
