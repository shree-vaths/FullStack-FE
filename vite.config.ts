import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * How API calls reach the server:
 *   - production build: the browser calls the Render API directly
 *     (VITE_API_BASE_URL in .env.production; the API allows it via CORS).
 *   - `npm run dev`: code calls relative /api/... and this proxy forwards it,
 *     to Render by default, so dev needs no CORS.
 *
 * Point dev at a local server instead with:
 *   API_URL=http://localhost:3001 npm run dev
 *
 * KEEP IN SYNC: the Render URL is also in .env.production.
 */
const RENDER_API = 'https://fullstack-be-ewy9.onrender.com';
const API_TARGET = process.env.API_URL ?? RENDER_API;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET,
        // Send Render's own hostname in the Host header; Render routes
        // requests by hostname and rejects ones addressed to "localhost".
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
