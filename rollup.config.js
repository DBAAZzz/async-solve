import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import babel from "@rollup/plugin-babel";
import { uglify } from 'rollup-plugin-uglify';


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
      typescript(),
      uglify()
    ],
  },
]