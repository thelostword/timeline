/*
 * @Author: losting
 * @Date: 2022-04-01 16:04:32
 * @LastEditTime: 2022-09-05 12:01:41
 * @LastEditors: thelostword
 * @Description: 
 * @FilePath: \timeline\rollup.config.js
 */

import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "./src/index.ts",
    output: [
      { format: "cjs", file: pkg.main, },
      { format: "esm", file: pkg.module, },
      // { format: "cjs", file: pkg.main, sourcemap: true, plugins: [terser()] },
      // { format: "esm", file: pkg.module, sourcemap: true, plugins: [terser()] },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      sourceMaps(),
    ],
  },
  {
    input: "./src/index.d.ts",
    output: [{ file: "lib/timeline.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
