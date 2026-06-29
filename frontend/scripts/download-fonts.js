/**
 * download-fonts.js
 *
 * Downloads the 7 required font TTF files into src/assets/fonts/.
 * Works with Node.js 18+ (uses built-in fetch and https).
 *
 * Run from the frontend/ directory:
 *   node scripts/download-fonts.js
 */

'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.resolve(__dirname, '../src/assets/fonts');

// User-Agent that causes Google Fonts to return TTF format
const TTF_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.54.16';

const FONT_FAMILIES = [
  'Inter:wght@400;500;600;700',
  'DM+Serif+Display:ital,wght@0,400',
  'Noto+Sans+Ethiopic:wght@400;700',
];

// Maps CSS font-family + font-weight back to required filenames
const FILE_MAP = {
  'Inter_400': 'Inter-Regular.ttf',
  'Inter_500': 'Inter-Medium.ttf',
  'Inter_600': 'Inter-SemiBold.ttf',
  'Inter_700': 'Inter-Bold.ttf',
  'DM Serif Display_400': 'DMSerifDisplay-Regular.ttf',
  'Noto Sans Ethiopic_400': 'NotoSansEthiopic-Regular.ttf',
  'Noto Sans Ethiopic_700': 'NotoSansEthiopic-Bold.ttf',
};

/** Fetches text from a URL, following redirects. */
function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': TTF_USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(fetchText(res.headers.location));
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/** Downloads a binary file to dest, following redirects. */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    function get(u) {
      https.get(u, { headers: { 'User-Agent': TTF_USER_AGENT } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    get(url);
  });
}

async function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  }

  console.log('Fetching font CSS from Google Fonts...\n');

  const query = FONT_FAMILIES.map((f) => `family=${f}`).join('&');
  const cssUrl = `https://fonts.googleapis.com/css2?${query}&display=swap`;

  const css = await fetchText(cssUrl);

  const fontFaceRegex = /@font-face\s*\{([^}]+)\}/g;
  const srcRegex = /src:\s*url\(([^)]+)\)/;
  const familyRegex = /font-family:\s*['"]?([^'";]+)['"]?/;
  const weightRegex = /font-weight:\s*(\d+)/;

  const downloads = [];
  let match;

  while ((match = fontFaceRegex.exec(css)) !== null) {
    const block = match[1];
    const srcMatch = srcRegex.exec(block);
    const familyMatch = familyRegex.exec(block);
    const weightMatch = weightRegex.exec(block);

    if (!srcMatch || !familyMatch || !weightMatch) continue;

    const url = srcMatch[1].trim();
    const family = familyMatch[1].trim();
    const weight = weightMatch[1].trim();
    const key = `${family}_${weight}`;
    const filename = FILE_MAP[key];

    if (!filename) continue;
    downloads.push({ url, filename, family, weight });
  }

  // Deduplicate (unicode-range splits produce multiple src entries per weight)
  const seen = new Set();
  const unique = downloads.filter(({ filename }) => {
    if (seen.has(filename)) return false;
    seen.add(filename);
    return true;
  });

  if (unique.length === 0) {
    console.error('No font URLs found. Check your internet connection.');
    process.exit(1);
  }

  console.log(`Found ${unique.length} fonts to download:\n`);

  for (const { url, filename, family, weight } of unique) {
    const dest = path.join(FONTS_DIR, filename);
    process.stdout.write(`  Downloading ${filename} (${family} ${weight})...`);
    try {
      await downloadFile(url, dest);
      console.log(' ✓');
    } catch (err) {
      console.log(` ✗ FAILED: ${err.message}`);
    }
  }

  console.log('\nDone. Check src/assets/fonts/ for your files.\n');

  const expected = Object.values(FILE_MAP);
  let allPresent = true;
  for (const filename of expected) {
    const exists = fs.existsSync(path.join(FONTS_DIR, filename));
    console.log(`  ${exists ? '✓' : '✗ MISSING'} ${filename}`);
    if (!exists) allPresent = false;
  }

  if (!allPresent) {
    console.error('\nSome fonts missing. Re-run or download manually from fonts.google.com');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
