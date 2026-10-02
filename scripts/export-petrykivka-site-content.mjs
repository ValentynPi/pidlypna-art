import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const titlesPath = path.join(root, 'src/i18n/artworkTitles.ts');
const descPath = path.join(root, 'src/i18n/artworkDescriptions.ts');
const contentPath = path.join(root, 'src/data/site-content.json');

function extractMap(fileText, idPrefix) {
  const map = { en: {}, uk: {}, es: {} };
  for (const lang of ['en', 'uk', 'es']) {
    const blockRe = new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\n  \\},`, 'm');
    const block = fileText.match(blockRe)?.[1] ?? '';
    const entryRe = new RegExp(`'(${idPrefix}[^']+)':\\s*'((?:\\\\'|[^'])*)'`, 'g');
    let m;
    while ((m = entryRe.exec(block))) {
      map[lang][m[1]] = m[2].replace(/\\'/g, "'");
    }
  }
  return map;
}

function extractDescriptions(fileText, idPrefix) {
  const map = { en: {}, uk: {}, es: {} };
  for (const lang of ['en', 'uk', 'es']) {
    const blockRe = new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\n  \\},`, 'm');
    const block = fileText.match(blockRe)?.[1] ?? '';
    const entryRe = new RegExp(
      `'(${idPrefix}[^']+)':\\s*\\n\\s*'((?:\\\\'|[^'])*)'`,
      'g',
    );
    let m;
    while ((m = entryRe.exec(block))) {
      map[lang][m[1]] = m[2].replace(/\\'/g, "'");
    }
  }
  return map;
}

const titlesText = fs.readFileSync(titlesPath, 'utf8');
const descText = fs.readFileSync(descPath, 'utf8');
const titles = extractMap(titlesText, 'petrykivka-');
const descriptions = extractDescriptions(descText, 'petrykivka-');

const existing = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

const artworks = {
  ...existing.artworks,
  'petrykivka-14': { hidden: true },
  'petrykivka-18': {
    sizeCm: { width: 20, height: 20 },
    image: '/images/petrykivka-blue-glow-1.jpg?v=3',
  },
  'petrykivka-19': {
    sizeCm: { width: 20, height: 20 },
    image: '/images/petrykivka-autumn-melody-1.jpg?v=3',
  },
  'petrykivka-20': {
    sizeCm: { width: 30, height: 30 },
    image: '/images/petrykivka-enchanted-garden-1.jpg?v=3',
  },
  'petrykivka-16': { image: '/images/petrykivka-peonies-in-garden-1.jpg?v=3' },
  'petrykivka-17': { image: '/images/petrykivka-frosty-patterns-1.jpg?v=3' },
  'petrykivka-02': {
    image: '/images/petrykivka-blue-bloom-1.jpg?v=3',
    images: [
      { src: '/images/petrykivka-blue-bloom-2.jpg?v=3', alt: 'Blue Bloom — alternate view' },
      { src: '/images/petrykivka-blue-bloom-3.jpg?v=3', alt: 'Blue Bloom — alternate view' },
    ],
  },
};

const next = {
  ...existing,
  version: 2,
  titles: {
    en: { ...existing.titles.en, ...titles.en },
    uk: { ...existing.titles.uk, ...titles.uk },
    es: { ...existing.titles.es, ...titles.es },
  },
  descriptions: {
    en: { ...existing.descriptions.en, ...descriptions.en },
    uk: { ...existing.descriptions.uk, ...descriptions.uk },
    es: { ...existing.descriptions.es, ...descriptions.es },
  },
  artworks,
};

fs.writeFileSync(contentPath, `${JSON.stringify(next, null, 2)}\n`);
console.log('Updated site-content.json with Petrykivka titles/descriptions.');
