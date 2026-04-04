import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  root: '.',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
