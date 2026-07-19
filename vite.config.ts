import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages project site uses /pidlypna-art/; Vercel keeps /
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
});
