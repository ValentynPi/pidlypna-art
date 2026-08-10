import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const SRC_ROOT = 'd:\\Web pages\\Pidlypna art photos 2';
const DST = 'd:\\Sandbox\\Paint web site 2.0\\public\\images';
const OUT_DATA = 'd:\\Sandbox\\Paint web site 2.0\\src\\data';

/** Folder → paintings → source filenames (exact names in folder) */
const ALBUMS = [
  {
    folder: 'Abstract Art',
    id: 'abstract-art',
    name: 'Abstract Art',
    intro:
      'Compositions that speak through color, gesture, and form — atmospheres beyond the literal.',
    paintings: [
      {
        slug: 'mist-horizon',
        title: 'Mist Horizon',
        files: [
          'PXL_20260717_130157124.jpg',
          'PXL_20260717_125953386.jpg',
          'PXL_20260717_125957692.jpg',
        ],
        materials: 'Oil',
        technique: 'Atmospheric abstract landscape',
        description:
          'Cream sky over cool blue reflection, divided by a dark textured horizon.',
      },
      {
        slug: 'ember-reflection',
        title: 'Ember Reflection',
        files: [
          'PXL_20260717_125842654.jpg',
          'PXL_20260717_125857999.jpg',
          'PXL_20260717_125904227.jpg',
        ],
        materials: 'Oil',
        technique: 'Abstract sunset landscape',
        description:
          'Warm peach sky and a red reflection on dark water, with a bright yellow accent.',
      },
      {
        slug: 'city-light',
        title: 'City Light',
        files: [
          'photo_2026-08-05_13-57-56.jpg',
          'photo_2026-08-05_13-58-02.jpg',
          'photo_2026-08-05_13-58-09.jpg',
        ],
        materials: 'Oil',
        technique: 'Abstract cityscape',
        description:
          'An abstracted city skyline glowing from within — warm light rising through dark towers.',
      },
      {
        slug: 'day-and-night',
        title: 'Day & Night',
        files: ['photo_2026-08-05_13-58-35.jpg'],
        materials: 'Mixed media',
        technique: 'Split-tone tree composition',
        description:
          'A single tree divided between warm gold light and cool darkness — two worlds in one trunk.',
      },
    ],
  },
  {
    folder: 'Affirmation Collection',
    id: 'affirmation-collection',
    name: 'Affirmation Collection',
    intro:
      'Words and images woven together — paintings that hold strength, intention, and daily courage.',
    paintings: [
      {
        slug: 'soy-fuerte',
        title: 'Soy Fuerte',
        files: [
          'PXL_20260716_163536870.jpg',
          'PXL_20260716_163540648.jpg',
          'PXL_20260716_163718888.jpg',
        ],
        materials: 'Acrylic',
        technique: 'Text affirmation seascape',
        description:
          'Stylized blue waves carry the words Soy Fuerte — strength written into the sea.',
      },
      {
        slug: 'shine-love-create',
        title: 'Shine · Love · Create',
        files: [
          'PXL_20260716_163930583.jpg',
          'PXL_20260716_164005846.jpg',
          'PXL_20260716_164057293.jpg',
        ],
        materials: 'Mixed media',
        technique: 'Word and image composition',
        description:
          'Сяй · Кохай · Твори — shine, love, create — written into soft pink light.',
      },
    ],
  },
  {
    folder: 'Alcohol Ink Art',
    id: 'alcohol-ink-art',
    name: 'Alcohol Ink Art',
    intro:
      'Fluid pigment on panel — luminous landscapes and circles born from chance and control.',
    paintings: [
      {
        slug: 'pastel-hills',
        title: 'Pastel Hills',
        files: [
          'PXL_20260716_171921324.jpg',
          'PXL_20260716_171945148.jpg',
          'PXL_20260716_171951859.jpg',
        ],
        materials: 'Alcohol ink',
        technique: 'Fluid landscape',
        description:
          'Rose, lavender, and yellow hills born from flowing ink — landscape as breath.',
      },
      {
        slug: 'soft-terrain',
        title: 'Soft Terrain',
        files: [
          'PXL_20260716_165022619.jpg',
          'PXL_20260716_165148176.jpg',
          'PXL_20260716_165156572.jpg',
        ],
        materials: 'Alcohol ink',
        technique: 'Fluid landscape',
        description:
          'A pink sky over dark rolling hills — dusk distilled into ink.',
      },
      {
        slug: 'ink-circle',
        title: 'Ink Circle',
        files: [
          'PXL_20260716_171356057.jpg',
          'PXL_20260716_171403839.jpg',
          'PXL_20260716_171414786.jpg',
        ],
        materials: 'Alcohol ink',
        technique: 'Circular fluid composition',
        description:
          'A luminous circle of pink, lavender, and indigo with gold accents.',
      },
      {
        slug: 'ink-study-i',
        title: 'Ink Study I',
        files: [
          'PXL_20260716_165219782.jpg',
          'PXL_20260716_165227970.jpg',
          'PXL_20260716_165233419.jpg',
        ],
        materials: 'Alcohol ink',
        technique: 'Fluid abstract',
        description: 'Ink allowed to bloom and settle — color finding its own edges.',
      },
    ],
  },
  {
    folder: 'Female Portraits',
    id: 'female-portraits',
    name: 'Female Portraits',
    intro:
      'Faces and figures of women — from floral-crowned silhouettes to dreamlike seascapes of identity.',
    paintings: [
      {
        slug: 'floral-crown',
        title: 'Floral Crown',
        files: [
          'InShot_20260717_155018888.jpg',
          'PXL_20260717_134616395.jpg',
          'PXL_20260717_134637664.jpg',
          'PXL_20260717_134700285.jpg',
        ],
        materials: 'Mixed media',
        technique: 'Portrait with floral headpiece',
        description:
          'A grayscale silhouette crowned with vibrant flowers — identity blooming outward.',
      },
      {
        slug: 'ocean-dream',
        title: 'Ocean Dream',
        files: ['PXL_20260717_130808285.jpg', 'PXL_20260717_130719939.jpg', 'PXL_20260717_130725690.MP.jpg'],
        materials: 'Oil and acrylic',
        technique: 'Surrealist portrait',
        description:
          'A woman merges with ocean and sky — identity as tide and horizon.',
      },
      {
        slug: 'tiger-bloom',
        title: 'Tiger Bloom',
        files: ['InShot_20260717_163612621.jpg', 'PXL_20260717_125449352.jpg'],
        materials: 'Acrylic',
        technique: 'Surrealist portrait',
        description:
          'A tiger and woman joined by pink peonies — wildness and tenderness in one frame.',
      },
      {
        slug: 'portrait-study',
        title: 'Portrait Study',
        files: ['PXL_20260717_125230747.jpg', 'PXL_20260717_125235541.jpg', 'PXL_20260717_125251928.jpg'],
        materials: 'Oil',
        technique: 'Expressive portrait',
        description: 'An intimate portrait study in layered color and light.',
      },
    ],
  },
  {
    folder: 'Floral Collection',
    id: 'floral-collection',
    name: 'Floral Collection',
    intro:
      'Classic floral still lifes — bouquets studied for light, texture, and quiet drama.',
    paintings: [
      {
        slug: 'sunflowers',
        title: 'Sunflowers',
        files: [
          'PXL_20260716_162330625.jpg',
          'PXL_20260716_162357032.jpg',
          'PXL_20260716_162417619.jpg',
          'PXL_20260716_162551315.jpg',
        ],
        materials: 'Oil',
        technique: 'Floral still life',
        description:
          'Three sunflowers in a green vase against teal — summer held in a simple arrangement.',
      },
      {
        slug: 'white-lilacs',
        title: 'White Lilacs',
        files: [
          'PXL_20260717_125559490.jpg',
          'PXL_20260717_125604370.jpg',
          'PXL_20260717_125625503.MP.jpg',
        ],
        materials: 'Oil',
        technique: 'Floral still life',
        description:
          'White lilacs in a glass vase against deep burgundy — perfume translated into paint.',
      },
    ],
  },
  {
    folder: 'Inspired by Nature',
    id: 'inspired-by-nature',
    name: 'Inspired by Nature',
    intro:
      'Landscapes, seas, and skies observed with feeling — nature translated into color and light.',
    paintings: [
      {
        slug: 'nature-study',
        title: 'Nature Study',
        files: [
          'PXL_20260717_125711965.jpg',
          'PXL_20260717_125716513.jpg',
          'PXL_20260717_125732407.jpg',
        ],
        materials: 'Oil',
        technique: 'Landscape study',
        description:
          'A nature study observed on location — light, air, and distance held in paint.',
      },
    ],
  },
  {
    folder: 'Petrykivka',
    id: 'petrykivka',
    name: 'Petrykivka',
    intro:
      'The Ukrainian decorative painting tradition — stylized florals, berries, and brush-stroke ornaments.',
    paintings: [
      {
        slug: 'kalyna-night',
        title: 'Kalyna Night',
        files: [
          'PXL_20260716_164638581.jpg',
          'PXL_20260716_164643661.jpg',
          'PXL_20260716_164648588.jpg',
        ],
        materials: 'Acrylic',
        technique: 'Petrykivka decorative painting',
        description:
          'White berries and leaves bloom against a deep burgundy ground — kalyna as memory of home.',
      },
      {
        slug: 'blue-bloom',
        title: 'Blue Bloom',
        files: [
          'PXL_20260716_164912575.jpg',
          'PXL_20260716_164923732.jpg',
          'PXL_20260716_164941901.jpg',
        ],
        materials: 'Acrylic',
        technique: 'Petrykivka decorative painting',
        description:
          'A blue flower opens against black, edged with orange leaves that catch the light.',
      },
      {
        slug: 'blue-gold',
        title: 'Blue & Gold',
        files: [
          'PXL_20260716_172254485.jpg',
          'PXL_20260716_172242034.jpg',
          'PXL_20260716_172248816.jpg',
        ],
        materials: 'Acrylic',
        technique: 'Petrykivka decorative painting',
        description:
          'A small floral sprig in blue and gold — intimate, deliberate, almost calligraphic.',
      },
      {
        slug: 'teal-peonies',
        title: 'Teal Peonies',
        files: [
          'PXL_20260716_172319507.jpg',
          'PXL_20260716_172324904.jpg',
          'PXL_20260716_172333837.jpg',
          'PXL_20260804_133723877.jpg',
        ],
        materials: 'Acrylic',
        technique: 'Petrykivka decorative painting',
        description:
          'Teal and burgundy flowers unfold on white canvas — fresh, airy, and full of spring energy.',
      },
      {
        slug: 'red-berry-vine',
        title: 'Red Berry Vine',
        files: ['PXL_20260804_132727011.jpg'],
        materials: 'Gouache',
        technique: 'Petrykivka decorative painting',
        description:
          'A tall vertical scroll of red blossoms, green leaves, and blue berry clusters.',
      },
      {
        slug: 'garden-path',
        title: 'Garden Path',
        files: ['InShot_20260804_153427920.jpg'],
        materials: 'Gouache',
        technique: 'Petrykivka decorative painting',
        description:
          'Orange and blue flowers wind upward along a green stem in classic Petrykivka strokes.',
      },
      {
        slug: 'firebird',
        title: 'Firebird',
        files: ['PXL_20260804_133019951.jpg'],
        materials: 'Gouache',
        technique: 'Petrykivka decorative painting',
        description:
          'The mythical firebird rises from a black ground surrounded by ornamental florals.',
      },
      {
        slug: 'flame-sprig',
        title: 'Flame Sprig',
        files: ['PXL_20260804_132848731.jpg'],
        materials: 'Gouache',
        technique: 'Petrykivka decorative painting',
        description:
          'Three flame-red flowers bloom along a vertical stem with green leaves and red berries.',
      },
      {
        slug: 'spiral-garden',
        title: 'Spiral Garden',
        files: ['PXL_20260804_133655516.jpg'],
        materials: 'Gouache',
        technique: 'Petrykivka decorative painting',
        description:
          'Floral motifs spiral outward on a round canvas in a quiet monochromatic palette.',
      },
    ],
  },
  {
    folder: 'Plain Air Collection',
    id: 'plain-air-collection',
    name: 'Plain Air Collection',
    intro:
      'Painted from life and light — mountains, coasts, and horizons observed with a quiet eye.',
    paintings: [
      {
        slug: 'snow-peaks',
        title: 'Snow Peaks',
        files: [
          'PXL_20260717_124836905.MP.jpg',
          'PXL_20260717_124846406.jpg',
          'PXL_20260717_124740342.jpg',
          'PXL_20260717_124746757.jpg',
          'PXL_20260717_124804479.jpg',
        ],
        materials: 'Oil',
        technique: 'Mountain landscape',
        description:
          'Snow-capped peaks under a pale blue sky — distance made clear and calm.',
      },
      {
        slug: 'golden-balloon',
        title: 'Golden Balloon',
        files: [
          'PXL_20260717_131259051.jpg',
          'PXL_20260717_131325300.jpg',
          'PXL_20260717_131326962.jpg',
          'PXL_20260717_131340973.jpg',
        ],
        materials: 'Mixed media',
        technique: 'Imaginative landscape',
        description:
          'A golden hot air balloon over a misty coastal castle — travel as dream.',
      },
      {
        slug: 'plein-air-ii',
        title: 'Plein Air II',
        files: [
          'photo_2026-08-05_13-57-38.jpg',
          'photo_2026-08-05_13-57-43.jpg',
          'photo_2026-08-05_13-57-47.jpg',
        ],
        materials: 'Oil',
        technique: 'Plein air landscape',
        description: 'A landscape observed on location — color as immediate response.',
      },
      {
        slug: 'lavender-fields',
        title: 'Lavender Fields',
        files: [
          'PXL_20260731_155903388.jpg',
          'PXL_20260731_155321152.jpg',
          'PXL_20260731_155442934.jpg',
        ],
        materials: 'Oil',
        technique: 'Plein air landscape',
        description: 'Purple lavender rows leading toward a golden field and distant mountains.',
      },
    ],
  },
  {
    folder: 'Pop Art',
    id: 'pop-art',
    name: 'Pop Art',
    intro:
      'Bold color, graphic energy, and contemporary icons — art that speaks with confidence.',
    paintings: [
      {
        slug: 'vibrant-spirit',
        title: 'Vibrant Spirit',
        files: [
          'PXL_20260717_124415399.jpg',
          'PXL_20260717_124428095.jpg',
          'PXL_20260717_124437973.jpg',
        ],
        materials: 'Oil',
        technique: 'Expressive color portrait',
        description:
          'Bold color and painterly texture — a face that refuses to be quiet.',
      },
      {
        slug: 'thoughts',
        title: 'Thoughts',
        files: ['PXL_20260717_130624498.jpg'],
        materials: 'Mixed media',
        technique: 'Word and image composition',
        description:
          'Pastel fields crossed by the handwritten word Thoughts — mind made visible.',
      },
    ],
  },
  {
    folder: 'Textured & Light',
    id: 'textured-and-light',
    name: 'Textured & Light',
    intro:
      'Surface as story — impasto, metallic layers, and tactile depths you can almost feel.',
    paintings: [
      {
        slug: 'halo',
        title: 'Halo',
        files: [
          'PXL_20260717_133109716.jpg',
          'PXL_20260717_133141098.jpg',
          'PXL_20260717_133148703.jpg',
          'PXL_20260717_132013708.jpg',
          'PXL_20260717_132016834.jpg',
          'PXL_20260717_132035832.jpg',
          'PXL_20260717_132052011.jpg',
        ],
        materials: 'Mixed media, metallic gold',
        technique: 'Textured diptych',
        description:
          'A white and gold circle spanning two panels — one form, two breaths.',
      },
      {
        slug: 'gold-arcs',
        title: 'Gold Arcs',
        files: [
          'PXL_20260717_132516436.jpg',
          'PXL_20260717_132527189.jpg',
          'PXL_20260717_132545595.jpg',
          'PXL_20260717_132600851.jpg',
          'PXL_20260717_132931176.jpg',
          'PXL_20260717_133004402.jpg',
          'PXL_20260717_133019486.jpg',
        ],
        materials: 'Mixed media, metallic gold',
        technique: 'Textured abstract composition',
        description:
          'Textured metallic gold arcs crossing clean white space — quiet architecture of light.',
      },
    ],
  },
  {
    folder: 'Ukrainian Symbolism',
    id: 'ukrainian-symbolism',
    name: 'Ukrainian Symbolism',
    intro:
      'Heritage held in paint — embroidery, memory, and symbols that carry Ukraine into the present.',
    paintings: [
      {
        slug: 'heritage',
        title: 'Heritage',
        files: [
          'PXL_20260717_125059587.jpg',
          'PXL_20260717_125115317.MP.jpg',
          'PXL_20260717_125120012.MP.jpg',
          'PXL_20260717_131107572.jpg',
          'PXL_20260717_135350481.jpg',
          'PXL_20260717_135405088.jpg',
        ],
        materials: 'Oil and acrylic',
        technique: 'Portrait with folk embroidery motifs',
        description:
          'A face split between realism and Ukrainian folk embroidery — memory woven into skin.',
      },
    ],
  },
];

/** Files kept for About/Workshops legacy refs but not as gallery painting views */
const EXTRA_FILES = {
  Petrykivka: ['PXL_20260716_172137396.jpg'], // studio shot of two paintings together
};

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function findFolder(name) {
  return fs.readdirSync(SRC_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(SRC_ROOT, d.name))
    .find((p) => path.basename(p).trim() === name.trim() || path.basename(p).includes(name));
}

async function compress(input, output) {
  await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
}

// Validate all files assigned
const allAssigned = new Set();
for (const album of ALBUMS) {
  for (const p of album.paintings) {
    for (const f of p.files) allAssigned.add(`${album.folder}/${f}`);
  }
  for (const f of EXTRA_FILES[album.folder] ?? []) {
    allAssigned.add(`${album.folder}/${f}`);
  }
}

for (const album of ALBUMS) {
  const folderPath = findFolder(album.folder);
  if (!folderPath) throw new Error(`Folder not found: ${album.folder}`);
  const diskFiles = fs.readdirSync(folderPath).filter((f) => /\.(jpg|jpeg|png|mp\.jpg)$/i.test(f));
  for (const f of diskFiles) {
    if (!allAssigned.has(`${album.folder}/${f}`)) {
      throw new Error(`Unassigned file: ${album.folder}/${f}`);
    }
  }
}

// Remove old gallery images
if (fs.existsSync(DST)) {
  for (const f of fs.readdirSync(DST)) {
    if (/^(abstract-|affirmation-|alcohol-|female-|floral-|inspired-|petrykivka-|plain-|pop-|textured-|ukrainian-|nature-|places-|textured-|ukrainian-heritage|textured-halo|textured-gold)/.test(f)) {
      fs.unlinkSync(path.join(DST, f));
    }
  }
}

const photoEntries = {};
const artworks = [];
let artworkCounter = 0;

for (const album of ALBUMS) {
  const folderPath = findFolder(album.folder);
  const collectionCoverKey = `${album.id.replace(/-/g, '_')}_cover`;

  for (let paintingIndex = 0; paintingIndex < album.paintings.length; paintingIndex++) {
    const painting = album.paintings[paintingIndex];
    artworkCounter += 1;
    const artId = `${album.id}-${String(paintingIndex + 1).padStart(2, '0')}`;
    const imageKeys = [];

    for (let i = 0; i < painting.files.length; i++) {
      const srcName = painting.files[i];
      const outName = `${album.id}-${painting.slug}-${i + 1}.jpg`;
      const input = path.join(folderPath, srcName);
      const output = path.join(DST, outName);
      if (!fs.existsSync(input)) throw new Error(`Missing: ${input}`);
      await compress(input, output);
      const key = `${album.id}_${painting.slug}_${i + 1}`.replace(/-/g, '_');
      photoEntries[key] = outName;
      imageKeys.push(key);
    }

    // Ensure EXTRA_FILES stay available for legacy page refs
    for (const extra of EXTRA_FILES[album.folder] ?? []) {
      const input = path.join(folderPath, extra);
      const output = path.join(DST, extra);
      if (!fs.existsSync(input)) throw new Error(`Missing extra: ${input}`);
      if (!fs.existsSync(output)) await compress(input, output);
    }

    const coverKey = imageKeys[0];
    const altKeys = imageKeys.slice(1);

    if (!photoEntries[collectionCoverKey]) {
      photoEntries[collectionCoverKey] = photoEntries[coverKey];
    }

    artworks.push({
      id: artId,
      collectionId: album.id,
      title: painting.title,
      coverKey,
      altKeys,
      materials: painting.materials,
      technique: painting.technique,
      description: painting.description,
    });
  }
}

// Generate images.ts (gallery only + keep legacy refs for other pages)
const legacyPhotos = {
  treeStudio: 'photo_2026-07-08_12-34-21.jpg',
  workshopDetail: 'PXL_20260717_124740342.jpg',
  workshopDetail2: 'PXL_20260717_125711965.jpg',
  petrykivkaPair: 'PXL_20260716_172137396.jpg',
  petrykivkaBurgundy: 'petrykivka-kalyna-night-1.jpg',
  petrykivkaBurgundyAlt: 'petrykivka-kalyna-night-2.jpg',
  petrykivkaBlueGold: 'petrykivka-blue-bloom-1.jpg',
  petrykivkaBlueSmall: 'petrykivka-blue-gold-1.jpg',
  petrykivkaBlueRed: 'petrykivka-teal-peonies-1.jpg',
  goldCircleDiptych: 'textured-and-light-halo-1.jpg',
  goldArcs: 'textured-and-light-gold-arcs-1.jpg',
  inkCircle: 'alcohol-ink-art-ink-circle-1.jpg',
  heritageFace: 'ukrainian-symbolism-heritage-1.jpg',
  sunsetNew: 'abstract-art-ember-reflection-1.jpg',
  inkPastelLandscape: 'alcohol-ink-art-pastel-hills-1.jpg',
  soyFuerte: 'affirmation-collection-soy-fuerte-1.jpg',
  tigerBloom: 'female-portraits-tiger-bloom-1.jpg',
  floralCrownClean: 'female-portraits-floral-crown-1.jpg',
  snowPeaks: 'plain-air-collection-snow-peaks-1.jpg',
  balloonCastle: 'plain-air-collection-golden-balloon-1.jpg',
  thoughts: 'pop-art-thoughts-1.jpg',
  colorfulPortraitNew: 'pop-art-vibrant-spirit-1.jpg',
  treeStudio: 'photo_2026-07-08_12-34-21.jpg',
  workshopDetail: 'plain-air-collection-snow-peaks-3.jpg',
  workshopDetail2: 'inspired-by-nature-nature-study-1.jpg',
};

let imagesTs = `/** Local photos from /public/images — mapped to site sections */

const base = \`\${import.meta.env.BASE_URL.replace(/\\/$/, '')}/images\`;

export const photos = {
  // Legacy refs for About, Workshops, Journey, Exhibitions
`;
for (const [key, file] of Object.entries(legacyPhotos)) {
  imagesTs += `  ${key}: \`\${base}/${file}\`,\n`;
}
imagesTs += `\n  // Gallery albums\n`;
for (const [key, file] of Object.entries(photoEntries)) {
  imagesTs += `  ${key}: \`\${base}/${file}\`,\n`;
}
imagesTs += `} as const;\n\nexport type PhotoKey = keyof typeof photos;\n`;

fs.writeFileSync(path.join(OUT_DATA, 'images.ts'), imagesTs);

// collections.ts
let collectionsTs = `import { photos } from './images';\nimport type { Collection } from '../types';\n\nexport const collections: Collection[] = [\n`;
for (const album of ALBUMS) {
  const coverKey = `${album.id.replace(/-/g, '_')}_cover`;
  collectionsTs += `  {
    id: '${album.id}',
    name: '${album.name}',
    slug: '${album.id}',
    coverImage: photos.${coverKey},
    coverAlt: '${album.name} collection cover',
    intro: '${album.intro.replace(/'/g, "\\'")}',
  },\n`;
}
collectionsTs += `];\n\nexport function getCollectionById(id: string): Collection | undefined {\n  return collections.find((c) => c.id === id);\n}\n`;
fs.writeFileSync(path.join(OUT_DATA, 'collections.ts'), collectionsTs);

// artworks.ts
let artworksTs = `import { photos } from './images';\nimport type { Artwork, ArtworkImage } from '../types';\n\nexport const SHIPPING_NOTE = 'Worldwide shipping available.';\nexport const CARE_INSTRUCTIONS =\n  'Avoid direct sunlight and high humidity. Dust gently with a soft, dry cloth. Do not use liquid cleaners on the painted surface.';\n\nexport const artworks: Artwork[] = [\n`;

for (const a of artworks) {
  const imagesBlock = a.altKeys.length
    ? `,\n    images: [\n${a.altKeys.map((k) => `      { src: photos.${k}, alt: '${a.title} — alternate view' },`).join('\n')}\n    ]`
    : '';
  artworksTs += `  {
    id: '${a.id}',
    title: '${a.title}',
    year: 2025,
    dimensions: 'Contact for dimensions',
    materials: '${a.materials}',
    technique: '${a.technique}',
    surface: 'Canvas',
    framing: 'Unframed',
    signed: true,
    certificateOfAuthenticity: true,
    availability: 'Available',
    description: '${a.description.replace(/'/g, "\\'")}',
    image: photos.${a.coverKey},
    imageAlt: '${a.title} — front view'${imagesBlock},
    collectionId: '${a.collectionId}',
    featured: true,
  },\n`;
}

artworksTs += `];\n\nexport const featuredArtworks = artworks.filter((a) => a.featured);\n\nexport function getArtworkImages(artwork: Artwork): ArtworkImage[] {\n  const cover: ArtworkImage = { src: artwork.image, alt: artwork.imageAlt };\n  const seen = new Set<string>([cover.src]);\n  const extras: ArtworkImage[] = [];\n  for (const img of artwork.images ?? []) {\n    if (!seen.has(img.src)) {\n      seen.add(img.src);\n      extras.push(img);\n    }\n  }\n  return extras.length > 0 ? [cover, ...extras] : [cover];\n}\n\nexport function getArtworksByCollection(collectionId: string): Artwork[] {\n  return artworks.filter((a) => a.collectionId === collectionId);\n}\n\nexport function getArtworkById(id: string): Artwork | undefined {\n  return artworks.find((a) => a.id === id);\n}\n`;

fs.writeFileSync(path.join(OUT_DATA, 'artworks.ts'), artworksTs);

console.log(`Done: ${ALBUMS.length} collections, ${artworks.length} paintings`);
