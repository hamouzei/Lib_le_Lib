import { apiClient } from './api-client';

export interface RequestOtpPayload {
  destination: string; // phone or email
}

export interface VerifyOtpPayload {
  destination: string;
  code: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
  role: string;
  status: string;
}

/**
 * Request a one-time passcode to be sent to the given phone or email.
 * Maps to: POST /auth/otp/request
 */
export async function requestOtp(payload: RequestOtpPayload): Promise<void> {
  await apiClient.post('/auth/otp/request', payload);
}

/**
 * Verify the OTP code and receive JWT tokens.
 * Maps to: POST /auth/otp/verify
 */
export async function verifyOtp(payload: VerifyOtpPayload): Promise<AuthTokens> {
  const response = await apiClient.post<AuthTokens>('/auth/otp/verify', payload);
  return response.data;
}

/**
 * Rotate the access token using the current refresh token.
 * Called automatically by the api-client interceptor on 401.
 * Maps to: POST /auth/refresh
 */
export async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
  const response = await apiClient.post<AuthTokens>('/auth/refresh', { refreshToken });
  return response.data;
}
