import type { ApiMessage, ApiResponse } from './apiResponse';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:7000';
const TOKEN_KEY = 'colleger_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export function getTokenPayload(): { sub: string; name: string } | null {
  const token = tokenStorage.get();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  readonly messages: ApiMessage[];
  readonly statusCode: number;

  constructor(messages: ApiMessage[], statusCode: number) {
    const desc = messages.find(m => m.errorLevel === 'Error' || m.errorLevel === 'Fatal')?.description;
    super(desc ?? `HTTP ${statusCode}`);
    this.messages = messages;
    this.statusCode = statusCode;
  }
}

// Thrown on 401 — the request function also clears the token and redirects to
// /login before throwing, so callers don't need to do anything extra.
export class UnauthorizedError extends ApiError {}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = tokenStorage.get();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) return undefined as T;

  if (response.status === 401 && window.location.pathname !== '/login') {
    tokenStorage.clear();
    const returnTo = window.location.pathname + window.location.search;
    window.location.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    throw new UnauthorizedError([], 401);
  }

  let apiResponse: ApiResponse<T>;
  try {
    apiResponse = await response.json();
  } catch {
    throw new ApiError(
      [{ errorLevel: 'Error', code: response.status, description: `HTTP ${response.status}` }],
      response.status,
    );
  }

  const messages = apiResponse.messages ?? [];
  const hasErrors = messages.some(m => m.errorLevel === 'Error' || m.errorLevel === 'Fatal');

  if (!response.ok || hasErrors) {
    throw new ApiError(
      messages.length > 0
        ? messages
        : [{ errorLevel: 'Error', code: response.status, description: `HTTP ${response.status}` }],
      response.status,
    );
  }

  return apiResponse.data as T;
}

export const apiClient = {
  get:    <T>(path: string)                  => request<T>(path),
  post:   <T>(path: string, body: unknown)   => request<T>(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    <T>(path: string, body: unknown)   => request<T>(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: <T>(path: string)                  => request<T>(path, { method: 'DELETE' }),
};
