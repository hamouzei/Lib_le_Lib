import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/state/auth.store';

// ---------------------------------------------------------------------------
// API client — the ONLY place fetch/http calls are made.
// All service files import this; no screen or hook calls fetch directly.
// ---------------------------------------------------------------------------

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

/** Singleton Axios instance shared across all service modules. */
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// ---------------------------------------------------------------------------
// Request interceptor — attach the access token on every outgoing request.
// ---------------------------------------------------------------------------

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Response interceptor — on 401, attempt a token refresh once, then retry.
// If refresh also fails (expired refresh token), sign the user out.
// ---------------------------------------------------------------------------

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

function drainQueue(token: string): void {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retried?: boolean };

    if (error.response?.status !== 401 || originalRequest._retried) {
      return Promise.reject(error);
    }

    originalRequest._retried = true;

    if (isRefreshing) {
      // Another refresh is already in-flight — queue this request.
      return new Promise<string>((resolve) => {
        refreshQueue.push(resolve);
      }).then((newToken) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const { refreshToken, setTokens, signOut } = useAuthStore.getState();

      if (!refreshToken) {
        signOut();
        return Promise.reject(error);
      }

      const response = await axios.post<{ accessToken: string; refreshToken: string }>(
        `${BASE_URL}/auth/refresh`,
        { refreshToken },
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      setTokens(newAccessToken, newRefreshToken);
      drainQueue(newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return apiClient(originalRequest);
    } catch {
      useAuthStore.getState().signOut();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
