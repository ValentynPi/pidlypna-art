import sharp from 'sharp';
import { mkdir, copyFile, readdir } from 'fs/promises';
import { join, basename, extname } from 'path';

const SRC = 'd:\\Web pages\\Photos Pidlupna art';
const DST = 'd:\\Sandbox\\Paint web site 2.0\\public\\images';

/** Best front-facing shot per unique artwork */
const CURATED = [
  'InShot_20260717_155018888.jpg',
  'InShot_20260717_163612621.jpg',
  'PXL_20260716_162330625.jpg',
  'PXL_20260716_163536870.jpg',
  'PXL_20260716_164638581.jpg',
  'PXL_20260716_164912575.jpg',
  'PXL_20260716_165148176.jpg',
  'PXL_20260716_171356057.jpg',
  'PXL_20260716_171921324.jpg',
  'PXL_20260716_172137396.jpg',
  'PXL_20260716_172254485.jpg',
  'PXL_20260716_172319507.jpg',
  'PXL_20260717_124415399.jpg',
  'PXL_20260717_124836905.MP.jpg',
  'PXL_20260717_125059587.jpg',
  'PXL_20260717_125449352.jpg',
  'PXL_20260717_125625503.MP.jpg',
  'PXL_20260717_125842654.jpg',
  'PXL_20260717_130157124.jpg',
  'PXL_20260717_130624498.jpg',
  'PXL_20260717_130808285.jpg',
  'PXL_20260717_131107572.jpg',
  'PXL_20260717_131259051.jpg',
  'PXL_20260717_132013708.jpg',
  'PXL_20260717_132516436.jpg',
  'PXL_20260717_132931176.jpg',
  'PXL_20260717_133109716.jpg',
  'PXL_20260717_134616395.jpg',
  'PXL_20260717_135350481.jpg',
  // Extra angles for workshops / journey
  'PXL_20260716_162551315.jpg',
  'PXL_20260716_163540648.jpg',
  'PXL_20260716_164643661.jpg',
  'PXL_20260716_171403839.jpg',
  'PXL_20260717_124740342.jpg',
  'PXL_20260717_125711965.jpg',
  'PXL_20260717_132600851.jpg',
];

await mkdir(DST, { recursive: true });

let totalIn = 0;
let totalOut = 0;

for (const name of CURATED) {
  const input = join(SRC, name);
  const outName = name.replace(/\.MP\.jpg$/i, '.jpg').replace(/\s+/g, '-');
  const output = join(DST, outName);

  try {
    const meta = await sharp(input).metadata();
    totalIn += meta.size ?? 0;

    await sharp(input)
      .rotate()
      .resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(output);

    const outMeta = await sharp(output).metadata();
    totalOut += outMeta.size ?? 0;
    console.log(`✓ ${outName}`);
  } catch (err) {
    console.error(`✗ ${name}:`, err.message);
  }
}

console.log(
  `\nDone. ~${(totalOut / 1024 / 1024).toFixed(1)} MB compressed from curated set.`,
);
