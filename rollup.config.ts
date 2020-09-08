import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import less from 'rollup-plugin-less'
import staticFiles from 'rollup-plugin-static-files'
import serve from 'rollup-plugin-serve'

const pkg = require('./package.json')

const libraryName = 'marka'

const isProd = process.env.NODE_ENV === 'production'

const resolvePath = (...segs) => path.join(__dirname, ...segs)

const isWatch = process.env.WATCH === 'true'

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: !isProd },
    { file: pkg.module, format: 'es', sourcemap: !isProd },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
    less({
      output: resolvePath(`dist/${libraryName}.css`)
    }),
    staticFiles({
      include: ['./public']
    }),
    ...(isWatch ? [serve({
      contentBase: ['.', 'public']
    })]: [])
  ],
}
