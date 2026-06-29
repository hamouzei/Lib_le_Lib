import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

/** Pending state layout — minimal, no tab bar. */
export default function PendingLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        animation: 'fade',
      }}
    />
  );
}
