import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Typography, Spacing, Radius } from '@/constants/theme';

/**
 * Sign-in screen — Phase 3 stub.
 * Accepts phone or email, then navigates to OTP verification.
 * Full implementation in Phase 3.
 */
export default function SignInScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[Typography.display, { color: theme.text, marginBottom: Spacing.two }]}>
          Welcome.
        </Text>
        <Text style={[Typography.body, { color: theme.textSecondary, marginBottom: Spacing.ten }]}>
          A private space for people like you.
        </Text>

        {/* Placeholder input — full OTP flow in Phase 3 */}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
              color: theme.text,
              ...Typography.body,
            },
          ]}
          placeholder="Phone or email"
          placeholderTextColor={theme.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Continue with phone or email"
        >
          <Text style={[Typography.bodySemiBold, { color: '#FFFFFF' }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.six,
    paddingTop: Spacing.ten,
  },
  input: {
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  button: {
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
