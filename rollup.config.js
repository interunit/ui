/**
    *
    *
    * We probably don't need this file, but I'm keeping it here for reference for now
    *
    */
import * as fs from 'fs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const PACKAGE_NAME = process.cwd()
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
}
const extensions = ['.js', '.ts', '.tsx']

const babelOptions = {
  exclude: /node_modules/,
  extensions,
  configFile: '../../babel.config.json',
  babelHelpers: 'runtime'
}

const nodeOptions = {
  extensions
}

const typescriptOptions = {
  tsconfig: `../../tsconfig.json`,
  declaration: true,
  declarationDir: './dist',
  emitDeclarationOnly: true,
  declarationMap: true
}

export default {
  input: `${PACKAGE_NAME}/src/index.ts`,
  external: [...Object.keys(pkg.peerDependencies)],
  output: [
    {
      file: `./${pkg.main}`,
      format: 'cjs'
    },
    {
      file: `./${pkg.module}`,
      format: 'es'
    }
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(nodeOptions),
    typescript(typescriptOptions),
    babel(babelOptions),
    commonjs(commonjsOptions),
    terser()
  ]
}
