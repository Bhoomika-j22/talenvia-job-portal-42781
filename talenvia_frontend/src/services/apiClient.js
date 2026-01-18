import { getRuntimeConfig } from "../config/env";

/**
 * Small fetch wrapper with safe defaults and clear error messages.
 * Avoids hardcoding endpoints; the base URL is derived from env.
 */
async function request(path, { method = "GET", body, headers = {}, signal } = {}) {
  const { apiBase } = getRuntimeConfig();

  if (!apiBase) {
    // No backend configured: return a controlled error so UI can show placeholder state.
    const err = new Error(
      "API base URL is not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL."
    );
    err.code = "API_BASE_NOT_CONFIGURED";
    throw err;
  }

  const url = `${apiBase.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");

  if (!res.ok) {
    const err = new Error(
      (payload && payload.message) || `Request failed (${res.status}) for ${method} ${url}`
    );
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

// PUBLIC_INTERFACE
export const apiClient = {
  /** Fetch job listings with optional search/filter parameters. */
  async listJobs({ q, location, type, level, page, pageSize } = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (level) params.set("level", level);
    if (page) params.set("page", String(page));
    if (pageSize) params.set("pageSize", String(pageSize));

    // Placeholder path; backend may map differently. UI will handle errors gracefully.
    const path = params.toString() ? `/jobs?${params.toString()}` : "/jobs";
    return request(path);
  },

  /** Fetch current user profile (placeholder). */
  async getProfile() {
    return request("/me");
  },

  /** Update current user profile (placeholder). */
  async updateProfile(profile) {
    return request("/me", { method: "PUT", body: profile });
  },

  /** Fetch mock tests list (placeholder). */
  async listMockTests() {
    return request("/mock-tests");
  },

  /** Submit a mock test attempt (placeholder). */
  async submitMockTestAttempt(testId, answers) {
    return request(`/mock-tests/${encodeURIComponent(testId)}/attempts`, {
      method: "POST",
      body: { answers },
    });
  },
};
