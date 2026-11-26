/// <reference types="vite/client" />

/** Build-time environment variables this app reads (see src/api/apiUrl.ts). */
interface ImportMetaEnv {
  /** Absolute API origin, e.g. "https://fullstack-be-ewy9.onrender.com". Unset = relative /api URLs. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
