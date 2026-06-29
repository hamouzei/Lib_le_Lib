import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Redirect, Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { FontAssets, Colors } from '@/constants/theme';
import { useAuthStore } from '@/state/auth.store';
import { useUiStore } from '@/state/ui.store';

// ---------------------------------------------------------------------------
// TanStack Query client — single instance for the whole app.
// ---------------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30,   // 30 minutes
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
    },
    mutations: {
      retry: 0,
    },
  },
});

// ---------------------------------------------------------------------------
// Root layout — auth gate + font loading + providers.
//
// Redirect logic (evaluated in order):
//   1. No access token           → (auth)/sign-in
//   2. Token + pending/suspended → (pending)/
//   3. Token + staff role        → (admin)
//   4. Token + active member     → (app)
// ---------------------------------------------------------------------------

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const accessToken = useAuthStore((s) => s.accessToken);
  const status = useAuthStore((s) => s.status);
  const isStaff = useAuthStore((s) => s.isStaff);
  const colorScheme = useUiStore((s) => s.colorScheme);

  useEffect(() => {
    Font.loadAsync(FontAssets)
      .catch(() => {
        // Font loading failure is non-fatal — system fonts will be used.
        // Log in production monitoring but do not crash the app.
      })
      .finally(() => setFontsLoaded(true));
  }, []);

  const scheme =
    colorScheme === 'system'
      ? 'dark' // dark is the default experience
      : colorScheme;

  const backgroundColor = Colors[scheme].background;

  // Render an invisible placeholder while fonts load.
  // The animated splash overlay (rendered inside (auth) and (app) layouts)
  // covers this transition — the user never sees a flash.
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate>
        <Slot />
      </AuthGate>
    </QueryClientProvider>
  );
}

// ---------------------------------------------------------------------------
// AuthGate — redirects based on auth state before rendering children.
// Keeps the redirect logic in one place rather than duplicated per screen.
// ---------------------------------------------------------------------------

function AuthGate({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const status = useAuthStore((s) => s.status);
  const isStaff = useAuthStore((s) => s.isStaff);

  if (!accessToken) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (isStaff()) {
    return <>{children}</>;
  }

  if (status === 'pending_verification') {
    return <Redirect href="/(pending)/" />;
  }

  if (status === 'suspended' || status === 'banned' || status === 'deleted') {
    // For suspended/banned, sign out and redirect to auth.
    // The specific reason is communicated via an API error on next sign-in attempt.
    useAuthStore.getState().signOut();
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <>{children}</>;
}
