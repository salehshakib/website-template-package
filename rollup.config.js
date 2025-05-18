import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import image from "@rollup/plugin-image";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
      inlineDynamicImports: true, // <-- add this
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
      inlineDynamicImports: true, // <-- add this
    },
  ],
  plugins: [
    image(),
    peerDepsExternal(),
    resolve(),
    replace({
      "use client": "",
      preventAssignment: true,
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
  ],
};
