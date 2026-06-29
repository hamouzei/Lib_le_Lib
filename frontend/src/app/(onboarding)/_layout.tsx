import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';

/** Onboarding stack — linear flow, no back-button on first step. */
export default function OnboardingLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
        animation: 'slide_from_right',
      }}
    />
  );
}
