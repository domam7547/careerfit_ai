const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

function buildApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export { API_BASE_URL, buildApiUrl };

export const API_ENDPOINTS = {
  health: buildApiUrl("/health"),
  jobs: buildApiUrl("/jobs"),
  analyze: buildApiUrl("/analyze"),
};
