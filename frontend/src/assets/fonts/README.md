# Font Assets

This directory must contain the following 7 TTF files before the app builds.

## Required files

| File | Font | Weight |
|---|---|---|
| `Inter-Regular.ttf` | Inter | 400 |
| `Inter-Medium.ttf` | Inter | 500 |
| `Inter-SemiBold.ttf` | Inter | 600 |
| `Inter-Bold.ttf` | Inter | 700 |
| `DMSerifDisplay-Regular.ttf` | DM Serif Display | 400 |
| `NotoSansEthiopic-Regular.ttf` | Noto Sans Ethiopic | 400 |
| `NotoSansEthiopic-Bold.ttf` | Noto Sans Ethiopic | 700 |

## Download (run from the `frontend/` directory)

```bash
node scripts/download-fonts.js
```

This script uses Node.js built-in modules only — no third-party tools needed.
It fetches each font directly from Google Fonts and saves it here with the correct filename.

The font asset map is defined in `src/constants/theme.ts` → `FontAssets`.
