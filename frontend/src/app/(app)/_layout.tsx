import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, TabBarHeight } from '@/constants/theme';

/**
 * Main app tab navigator — only reached by verified active members.
 * Tab bar uses brand colors; icons will be replaced with custom SVGs in Phase 2.
 */
export default function AppLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBackground,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: TabBarHeight,
          paddingBottom: Platform.select({ ios: 28, android: 8, default: 8 }),
        },
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.3,
          marginTop: -Spacing.one,
        },
      }}
    >
      <Tabs.Screen
        name="discover/index"
        options={{ title: 'Discover' }}
      />
      <Tabs.Screen
        name="matches/index"
        options={{ title: 'Matches' }}
      />
      <Tabs.Screen
        name="resources/index"
        options={{ title: 'Resources' }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
}
