/*
 * @Author: losting
 * @Date: 2022-04-01 16:04:32
 * @LastEditTime: 2022-04-01 17:15:47
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \rollup-template\rollup.config.js
 */

import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.ts",
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    sourceMaps(),
  ],
  output: [
    { format: "cjs", file: "lib/moe.cjs.js" },
    { format: "esm", file: "lib/moe.esm.js" },
    { format: "cjs", file: pkg.main, sourcemap: true, plugins: [terser()] },
    { format: "esm", file: pkg.module, sourcemap: true, plugins: [terser()] },
  ],
  onwarn: (msg, warn) => {
    // 忽略 Circular 的错误
    if (!/Circular/.test(msg)) {
      warn(msg);
    }
  },
};
