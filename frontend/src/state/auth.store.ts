import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

// ---------------------------------------------------------------------------
// Secure storage adapter for Zustand persist middleware.
// JWT tokens live in expo-secure-store (iOS Keychain / Android Keystore),
// never in AsyncStorage or memory-only state.
// ---------------------------------------------------------------------------

const secureStorage: StateStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type UserRole = 'member' | 'verification_officer' | 'moderator' | 'admin' | 'health_professional';
export type UserStatus = 'pending_verification' | 'active' | 'suspended' | 'banned' | 'deleted';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
  role: UserRole | null;
  status: UserStatus | null;

  // Actions
  setTokens: (accessToken: string, refreshToken: string) => void;
  setIdentity: (userId: string, role: UserRole, status: UserStatus) => void;
  updateStatus: (status: UserStatus) => void;
  signOut: () => void;

  // Derived helpers (not persisted, computed on read)
  isAuthenticated: () => boolean;
  isVerified: () => boolean;
  isStaff: () => boolean;
}

// ---------------------------------------------------------------------------
// Store
// Tokens are persisted to SecureStore; identity fields are re-hydrated from
// the JWT payload on next boot — they are also persisted here as a convenience
// cache so the app can render the correct route before the first API call.
// ---------------------------------------------------------------------------

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      role: null,
      status: null,

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      setIdentity: (userId, role, status) =>
        set({ userId, role, status }),

      updateStatus: (status) =>
        set({ status }),

      signOut: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userId: null,
          role: null,
          status: null,
        }),

      isAuthenticated: () => get().accessToken !== null,

      isVerified: () => get().status === 'active',

      isStaff: () => {
        const role = get().role;
        return (
          role === 'verification_officer' ||
          role === 'moderator' ||
          role === 'admin' ||
          role === 'health_professional'
        );
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
