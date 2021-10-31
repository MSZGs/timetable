import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import autoExternal from "rollup-plugin-auto-external";

const terserConfig = { module: true, format: { comments: false } };

export default [
  {
    input: ["lib/index.js"],
    output: [
      {
        file: "dist/timetable.bundle.js",
        format: "es",
        sourcemap: true,
      },
      {
        file: "dist/timetable.bundle.min.js",
        format: "es",
        sourcemap: true,
        plugins: [terser(terserConfig)],
      },
    ],
    plugins: [minifyHTML(), nodeResolve()],
  },
  {
    input: ["lib/index.js"],
    output: [
      {
        file: "dist/timetable.js",
        format: "es",
        sourcemap: true,
      },
      {
        file: "dist/timetable.min.js",
        format: "es",
        sourcemap: true,
        plugins: [terser(terserConfig)],
      },
    ],
    plugins: [minifyHTML(), autoExternal()],
  },
];
