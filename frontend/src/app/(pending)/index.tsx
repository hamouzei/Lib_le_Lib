import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Typography, Spacing, Palette } from '@/constants/theme';

/**
 * Pending verification screen.
 * Members can see this screen while awaiting verification approval.
 * They can browse the discovery feed (blurred) but cannot like or access resources.
 * Full implementation in Phase 3 / Phase 5.
 */
export default function PendingScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status indicator */}
        <View style={[styles.statusPill, { backgroundColor: theme.primarySubtle }]}>
          <Text style={[Typography.overline, { color: theme.primary }]}>
            Verification in progress
          </Text>
        </View>

        <Text style={[Typography.heading1, { color: theme.text, marginTop: Spacing.five }]}>
          Almost there.
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginTop: Spacing.two }]}>
          Your documents are being reviewed. This usually takes 1–2 business days.
          You can browse in the meantime — profiles are blurred until you're verified.
        </Text>

        {/* Discovery feed placeholder — wired in Phase 5 */}
        <View style={[styles.blurPlaceholder, { backgroundColor: theme.backgroundElement }]}>
          <Text style={[Typography.caption, { color: theme.textMuted, textAlign: 'center' }]}>
            Discovery feed (blurred) — Phase 5
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.seven,
    paddingBottom: Spacing.ten,
  },
  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 100,
  },
  blurPlaceholder: {
    height: 320,
    borderRadius: 16,
    marginTop: Spacing.seven,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
