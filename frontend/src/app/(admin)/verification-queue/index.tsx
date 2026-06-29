import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Typography, Spacing } from '@/constants/theme';

/** Verification queue — Phase 8 stub. */
export default function VerificationQueueScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[Typography.heading1, { color: theme.text }]}>Verification Queue</Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.two }]}>
          Pending submissions — Phase 8.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.six, paddingTop: Spacing.six },
});
