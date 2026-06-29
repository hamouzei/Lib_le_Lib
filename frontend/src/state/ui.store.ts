import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------------------------------------------------------------------------
// UI store — local preferences that are not security-sensitive.
// Stored in AsyncStorage (not SecureStore) since none of these values are PII.
// ---------------------------------------------------------------------------

interface UiState {
  // Discreet mode: hides profile from discovery, limits discoverability
  discreetMode: boolean;
  // Low bandwidth: suppresses auto-play, requests lower-res images
  lowBandwidthMode: boolean;
  // App color scheme override ('system' defers to OS setting)
  colorScheme: 'system' | 'light' | 'dark';
  // Whether the user has dismissed the pending-state explainer card
  hasDismissedPendingBanner: boolean;
  // Whether the onboarding quiz prompt has been shown
  hasSeenQuizPrompt: boolean;

  // Actions
  setDiscreetMode: (enabled: boolean) => void;
  setLowBandwidthMode: (enabled: boolean) => void;
  setColorScheme: (scheme: 'system' | 'light' | 'dark') => void;
  dismissPendingBanner: () => void;
  markQuizPromptSeen: () => void;
  reset: () => void;
}

const defaults: Omit<UiState, keyof { [K in keyof UiState as UiState[K] extends Function ? K : never]: UiState[K] }> = {
  discreetMode: false,
  lowBandwidthMode: false,
  colorScheme: 'system',
  hasDismissedPendingBanner: false,
  hasSeenQuizPrompt: false,
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      ...defaults,

      setDiscreetMode: (enabled) => set({ discreetMode: enabled }),
      setLowBandwidthMode: (enabled) => set({ lowBandwidthMode: enabled }),
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      dismissPendingBanner: () => set({ hasDismissedPendingBanner: true }),
      markQuizPromptSeen: () => set({ hasSeenQuizPrompt: true }),

      reset: () =>
        set({
          discreetMode: false,
          lowBandwidthMode: false,
          colorScheme: 'system',
          hasDismissedPendingBanner: false,
          hasSeenQuizPrompt: false,
        }),
    }),
    {
      name: 'ui-prefs',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
