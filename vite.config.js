/*
 * @Author: thelostword
 * @Date: 2022-11-14 16:57:01
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-14 16:57:12
 * @FilePath: \timeline\vite.config.js
 */
/*
 * @Author: thelostword
 * @Date: 2022-11-11 14:51:58
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-14 15:50:03
 * @FilePath: \ls\vite.config.js
 */
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

/* eslint-disable */
import { defineConfig } from 'vite';
/* eslint-enable */

export default () => defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'umd', 'iife'],
      name: '$timeline',
      fileName: (format) => `timeline.${format}.js`
    },
  },
});
