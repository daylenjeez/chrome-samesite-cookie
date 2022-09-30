import path from "path";
import ts from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const baseConfig = {
  onwarn: function (warning) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
  },
  plugins: [
    ts({
      tsconfig: path.resolve("tsconfig.json"),
    }),
    nodeResolve({
      extensions: [".js", ".ts"],
    }),
    terser(),
  ],
};

export default [
  {
    input: "src/background.ts",
    output: {
      file: path.resolve("public/background.js"),
    },
    ...baseConfig,
  },
  {
    input: "src/popup.ts",
    output: {
      file: path.resolve("public/popup.js"),
      // format: "cjs",
    },
    ...baseConfig,
  },
];
