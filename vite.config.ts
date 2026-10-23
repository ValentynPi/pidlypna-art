import { writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { buildSitemapXml } from './src/seo/sitemap';

function generateSitemapPlugin() {
  return {
    name: 'generate-sitemap',
    buildStart() {
      writeFileSync('public/sitemap.xml', `${buildSitemapXml()}\n`, 'utf8');
    },
  };
}

export default defineConfig({
  // GitHub Pages project site uses /pidlypna-art/; Vercel keeps /
  base: process.env.VITE_BASE || '/',
  plugins: [generateSitemapPlugin(), react(), tailwindcss()],
});
