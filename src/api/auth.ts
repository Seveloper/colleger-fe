import { apiClient } from './client';

interface LoginResponse {
  accessToken: string;
}

export function login(username: string, password: string) {
  return apiClient.post<LoginResponse>('/api/v1/auth/login', { username, password });
}
