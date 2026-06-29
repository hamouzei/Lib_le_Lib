import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

/** Auth stack — no tab bar, no back-button header by default. */
export default function AuthLayout() {
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
