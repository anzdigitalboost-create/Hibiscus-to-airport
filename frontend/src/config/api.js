/**
 * API URL configuration.
 * The app is host-agnostic: API calls go to /api/* on the same origin,
 * which Vercel routes to the serverless functions in api/.
 * For local development, set VITE_BACKEND_URL to override the origin.
 */

const getBackendUrl = () => {
  // Explicit override via env var (local dev / preview)
  const env = import.meta.env.VITE_BACKEND_URL;
  if (env && env !== 'undefined' && env !== '') {
    return env.endsWith('/') ? env.slice(0, -1) : env;
  }
  // In production the backend is same-origin: /api/* is proxied to the
  // serverless functions in api/.
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

export const BACKEND_URL = getBackendUrl();
export const API = BACKEND_URL.endsWith('/api') ? BACKEND_URL : `${BACKEND_URL}/api`;
