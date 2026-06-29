import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Typography, Spacing } from '@/constants/theme';

/** Resources library — Phase 7 stub. */
export default function ResourcesScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[Typography.heading1, { color: theme.text }]}>Resources</Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.two }]}>
          Resource library + success stories — Phase 7.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.six, paddingTop: Spacing.six },
});
