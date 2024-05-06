
import path from 'node:path';
import { defineConfig } from 'vite';

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
