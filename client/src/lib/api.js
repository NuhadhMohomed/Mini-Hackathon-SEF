/**
 * Crumb & Bloom — Centralized API Client & Auth Utilities
 *
 * Adheres to:
 * - client/DESIGN.md & client/FRONTEND_RULES.md
 * - Simple lightweight fetch wrapper (no unnecessary axios or networking libraries)
 * - Automatic Bearer token attachment
 * - Authoritative error propagation
 */

const BASE_URL = '/api';
const TOKEN_KEY = 'crumb_bloom_token';
const USER_KEY = 'crumb_bloom_user';

// --- Auth Storage Helpers ---
export const getAuthToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return null;
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const setAuthSession = (token, user) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to store auth session:', e);
  }
};

export const clearAuthSession = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to clear auth session:', e);
  }
};

export const isAuthenticated = () => !!getAuthToken();

export const isStaffUser = () => {
  const user = getStoredUser();
  return user?.role === 'owner' || user?.role === 'staff' || user?.role === 'admin';
};

// --- HTTP Client ---
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    let data;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        (data && typeof data === 'object' && (data.message || data.error)) ||
        `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (!error.status) {
      error.message = error.message || 'Unable to connect to the bakery server. Please check your connection.';
    }
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body, ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: 'PUT', body, ...options }),
  patch: (endpoint, body, options) => request(endpoint, { method: 'PATCH', body, ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
};

export default api;
