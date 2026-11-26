/**
 * Where API requests go.
 *
 * VITE_API_BASE_URL is read at BUILD time (Vite inlines it into the bundle):
 *   - production build: set in .env.production to the Render API, so the
 *     browser calls https://fullstack-be-ewy9.onrender.com/api/... directly.
 *     The API allows this site's origin via CORS (server: CORS_ORIGINS).
 *   - `npm run dev` / tests: unset, so requests stay relative (/api/...) and
 *     go through the Vite dev proxy (same origin, no CORS involved).
 */
export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

/** "https://api.example.com/" -> "https://api.example.com"; undefined -> "" (relative). */
export function normalizeBaseUrl(value: string | undefined): string {
  return (value ?? '').trim().replace(/\/+$/, '');
}

/** Joins the base URL and an API path: apiUrl('/api/users') -> 'https://…/api/users'. */
export function apiUrl(path: string, baseUrl: string = API_BASE_URL): string {
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
