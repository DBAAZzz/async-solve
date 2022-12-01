import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import path from "path";
import typescript from 'rollup-plugin-typescript2';

module.exports = [
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'umd',
      name: 'asyncScheme',
    },
    plugins: [
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
      }),
      typescript({
        tsconfig: path.resolve(__dirname, "./tsconfig.json")
      }),
      uglify()
    ],
  },
]