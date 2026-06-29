import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Color system
// "Discreet intimacy" palette — warm, private, trustworthy.
// Dark is the primary experience; light mode is fully supported.
// ---------------------------------------------------------------------------

export const Palette = {
  // Core dark surfaces
  midnight: '#0F1117',
  dusk: '#1C1F2E',
  slate: '#2A2D3E',

  // Brand — warm rose, not neon
  roseWarm: '#C4617A',
  roseSoft: '#E8A0B0',
  roseMuted: '#8B3F54',
  roseFaint: '#3D1E28', // subtle tint for dark backgrounds

  // Light mode surfaces
  cream: '#F5EDE8',
  sand: '#EDE0DA',
  parchment: '#D9CABD',

  // Semantic
  success: '#3DAA6E',
  warning: '#C9923A',
  error: '#D95050',
  info: '#4E8FD4',

  // Neutral scale (for text, dividers, icons)
  white: '#FFFFFF',
  grey100: '#F4F4F6',
  grey200: '#E4E5EB',
  grey300: '#C8CAD4',
  grey400: '#9699A8',
  grey500: '#6B6E7E',
  grey600: '#4A4D5C',
  grey700: '#2E3140',
  grey800: '#1A1C28',
  black: '#000000',
} as const;

// ---------------------------------------------------------------------------
// Theme tokens — light and dark
// Every component reads from here via useTheme(), never from Palette directly.
// ---------------------------------------------------------------------------

export const Colors = {
  light: {
    // Surfaces
    background: Palette.cream,
    backgroundElement: Palette.sand,
    backgroundSelected: Palette.parchment,
    backgroundElevated: Palette.white,

    // Text
    text: '#1A1A2E',
    textSecondary: '#5A5D6E',
    textMuted: Palette.grey400,
    textInverse: Palette.white,

    // Brand
    primary: Palette.roseWarm,
    primarySoft: Palette.roseSoft,
    primarySubtle: '#F7E8EC',

    // Semantic
    success: Palette.success,
    warning: Palette.warning,
    error: Palette.error,
    info: Palette.info,

    // Borders / dividers
    border: Palette.grey200,
    borderStrong: Palette.grey300,

    // Tab bar
    tabActive: Palette.roseWarm,
    tabInactive: Palette.grey400,
    tabBackground: Palette.white,
  },
  dark: {
    // Surfaces
    background: Palette.midnight,
    backgroundElement: Palette.dusk,
    backgroundSelected: Palette.slate,
    backgroundElevated: '#232638',

    // Text
    text: '#EEF0F7',
    textSecondary: Palette.grey400,
    textMuted: Palette.grey500,
    textInverse: Palette.midnight,

    // Brand
    primary: Palette.roseSoft,
    primarySoft: Palette.roseWarm,
    primarySubtle: Palette.roseFaint,

    // Semantic
    success: '#5DC78A',
    warning: '#E8AB55',
    error: '#E87070',
    info: '#6EADEE',

    // Borders / dividers
    border: Palette.grey700,
    borderStrong: Palette.grey600,

    // Tab bar
    tabActive: Palette.roseSoft,
    tabInactive: Palette.grey500,
    tabBackground: Palette.dusk,
  },
} as const;

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;
export type ThemeColor = keyof ThemeColors;

// ---------------------------------------------------------------------------
// Typography scale
// Display: DM Serif Display — used sparingly, screen titles only
// Body/UI: Inter variable
// Amharic fallback: Noto Sans Ethiopic (loaded conditionally)
// ---------------------------------------------------------------------------

export const FontFamily = Platform.select({
  ios: {
    display: 'DMSerifDisplay-Regular',
    sans: 'Inter-Regular',
    sansMedium: 'Inter-Medium',
    sansSemiBold: 'Inter-SemiBold',
    sansBold: 'Inter-Bold',
    mono: 'ui-monospace',
    ethiopic: 'NotoSansEthiopic-Regular',
    ethiopicBold: 'NotoSansEthiopic-Bold',
  },
  android: {
    display: 'DMSerifDisplay-Regular',
    sans: 'Inter-Regular',
    sansMedium: 'Inter-Medium',
    sansSemiBold: 'Inter-SemiBold',
    sansBold: 'Inter-Bold',
    mono: 'monospace',
    ethiopic: 'NotoSansEthiopic-Regular',
    ethiopicBold: 'NotoSansEthiopic-Bold',
  },
  default: {
    display: 'DMSerifDisplay-Regular',
    sans: 'Inter-Regular',
    sansMedium: 'Inter-Medium',
    sansSemiBold: 'Inter-SemiBold',
    sansBold: 'Inter-Bold',
    mono: 'monospace',
    ethiopic: 'NotoSansEthiopic-Regular',
    ethiopicBold: 'NotoSansEthiopic-Bold',
  },
})!;

/** Full type scale. Every text style in the app maps to one of these tokens. */
export const Typography = {
  /** DM Serif Display — hero screen titles only */
  display: {
    fontFamily: FontFamily.display,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '400' as const,
    letterSpacing: -0.5,
  },
  heading1: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  heading2: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  heading3: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  body: {
    fontFamily: FontFamily.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  bodySemiBold: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  small: {
    fontFamily: FontFamily.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  smallMedium: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  caption: {
    fontFamily: FontFamily.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  /** ALL CAPS — use for category labels only */
  overline: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  code: {
    fontFamily: FontFamily.mono,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
} as const;

export type TypographyVariant = keyof typeof Typography;

// ---------------------------------------------------------------------------
// Spacing — 4-point base scale
// ---------------------------------------------------------------------------

export const Spacing = {
  px: 1,
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 32,
  eight: 40,
  nine: 48,
  ten: 64,
  eleven: 80,
  twelve: 96,
} as const;

// ---------------------------------------------------------------------------
// Border radius
// ---------------------------------------------------------------------------

export const Radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// Elevation / shadow
// ---------------------------------------------------------------------------

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

/** Max content width — prevents edge-to-edge stretch on tablets */
export const MaxContentWidth = 480;

/** Horizontal screen padding applied to all screens */
export const ScreenPaddingH = Spacing.six;

/** Tab bar total height (content padding-bottom reference) */
export const TabBarHeight = Platform.select({ ios: 83, android: 64, default: 64 })!;

// Legacy alias — kept so existing files that import this don't break
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

// ---------------------------------------------------------------------------
// Animation durations (milliseconds)
// ---------------------------------------------------------------------------

export const Duration = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  /** Used for the match celebration and photo reveal — emotionally significant moments */
  deliberate: 800,
} as const;

// ---------------------------------------------------------------------------
// Font asset map — consumed by useFonts() in the root layout
// Files must be downloaded into src/assets/fonts/ before building.
// ---------------------------------------------------------------------------

export const FontAssets = {
  'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
  'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  'NotoSansEthiopic-Regular': require('../assets/fonts/NotoSansEthiopic-Regular.ttf'),
  'NotoSansEthiopic-Bold': require('../assets/fonts/NotoSansEthiopic-Bold.ttf'),
} as const;
