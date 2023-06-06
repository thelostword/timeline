
import path from 'node:path';
/* eslint-disable */
import { defineConfig } from 'vite';
/* eslint-enable */

export default () => defineConfig({
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'umd', 'iife'],
      name: '$timeline',
      fileName: (format) => `timeline.${format}.js`,
    },
  },
});
