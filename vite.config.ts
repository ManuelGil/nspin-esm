import { defineConfig } from 'vite';

import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    target: 'node22',
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      external: ['node:perf_hooks', 'node:util'],
    },
  },
  plugins: [
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
});
