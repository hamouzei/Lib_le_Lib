import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

/**
 * Admin stack — only reachable by staff roles (verification_officer, moderator,
 * admin, health_professional). Role enforcement happens at the root AuthGate
 * in _layout.tsx; this layout simply provides the navigation chrome.
 */
export default function AdminLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.backgroundElement },
        headerTintColor: theme.text,
        headerTitleStyle: { fontSize: 17, fontWeight: '600' },
        contentStyle: { backgroundColor: theme.background },
      }}
    />
  );
}
