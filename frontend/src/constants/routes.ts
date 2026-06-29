/** Typed route constants — use these instead of raw string literals throughout the app. */
export const Routes = {
  // Auth
  signIn: '/(auth)/sign-in' as const,
  verifyOtp: '/(auth)/verify-otp' as const,

  // Onboarding
  createProfile: '/(onboarding)/create-profile' as const,
  uploadPhotos: '/(onboarding)/upload-photos' as const,
  compatibilityQuiz: '/(onboarding)/compatibility-quiz' as const,
  submitVerification: '/(onboarding)/submit-verification' as const,

  // Pending
  pending: '/(pending)/' as const,

  // App tabs
  discover: '/(app)/discover/' as const,
  matches: '/(app)/matches/' as const,
  profile: '/(app)/profile/' as const,
  settings: '/(app)/profile/settings' as const,

  // Match detail
  matchThread: (id: string) => `/(app)/matches/${id}/` as const,
  matchProfile: (id: string) => `/(app)/matches/${id}/profile` as const,

  // Resources & Q&A
  resources: '/(app)/resources/' as const,
  resourceDetail: (id: string) => `/(app)/resources/${id}` as const,
  qa: '/(app)/qa/' as const,
  qaThread: (id: string) => `/(app)/qa/${id}` as const,

  // Admin
  verificationQueue: '/(admin)/verification-queue/' as const,
  verificationReview: (id: string) => `/(admin)/verification-queue/${id}` as const,
  reports: '/(admin)/reports/' as const,
  reportDetail: (id: string) => `/(admin)/reports/${id}` as const,
} as const;
