import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'

const isProduction = process.env.NODE_ENV === 'production';

export default {
  preserveEntrySignatures: false,
  inlineDynamicImports: true,
  input: 'src/server.js',
  //input: 'test.js',
  output: {
    format: 'esm',
    //format: 'cjs',
    //format: 'iife',
    //dir: 'dist'
    //file: 'dist/bundle.esm.js'
    file: 'dist/build/bundle.js'
    //plugins: [terser()]
  },
  plugins: [
    //nodeResolve({ preferBuiltins: true }),
    //commonjs({ sourceMap: false, ignoreDynamicRequires: true }),
    commonjs(),
    //nodeResolve({ modulesOnly: true }),
    nodeResolve({ resolveOnly: [/@kernel\/.*$/]}),
    json(),
    dynamicImportVars()
  ]
}
