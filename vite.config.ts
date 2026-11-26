import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * The client always calls relative URLs (/api/...). Something in front of it
 * forwards them to the API, so the browser only ever talks to one origin and
 * the API needs no CORS setup:
 *   - production (Vercel): the rewrite in vercel.json -> Render
 *   - `npm run dev`:       this proxy -> Render by default
 *
 * Point dev at a local server instead with:
 *   API_URL=http://localhost:3001 npm run dev
 *
 * KEEP IN SYNC: the Render URL is also in vercel.json (JSON can't import it).
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
