import { useColorScheme as useRNColorScheme } from 'react-native';
import { useUiStore } from '@/state/ui.store';
import { Colors, type ColorScheme, type ThemeColors } from '@/constants/theme';

/**
 * Returns the active theme color tokens.
 *
 * Respects the user's in-app color scheme override (ui.store) with the OS
 * setting as the fallback. Replaces the minimal Expo scaffold version.
 */
export function useTheme(): ThemeColors {
  const systemScheme = useRNColorScheme();
  const preference = useUiStore((s) => s.colorScheme);

  const resolved: ColorScheme =
    preference !== 'system'
      ? preference
      : (systemScheme === 'dark' ? 'dark' : 'light');

  return Colors[resolved];
}

/**
 * Returns the resolved color scheme name ('light' | 'dark').
 * Use this when you need the scheme string rather than the token map.
 */
export function useColorScheme(): ColorScheme {
  const systemScheme = useRNColorScheme();
  const preference = useUiStore((s) => s.colorScheme);

  if (preference !== 'system') return preference;
  return systemScheme === 'dark' ? 'dark' : 'light';
}
