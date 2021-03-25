/* eslint-disable func-style */
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const yargs = require('yargs').argv

const { log, copyPackageJson, copyReadme, safeExec } = require('./utils')
const tscPath = path.resolve(__dirname, '../node_modules/.bin/tsc')

const compile = function (tsConfig, packageJson, packageRootDir) {
  const args = []

  log(`Building ${packageJson.name}:${packageJson.version}`)

  function build () {
    const cmd = `${tscPath} -p tsconfig.build.json ${args.join(' ')}`

    safeExec(cmd)
    log(`Build ready in: ${tsConfig.compilerOptions.outDir}`, 'green')
  }

  function clean () {
    log(`Removing: ${tsConfig.compilerOptions.outDir}`, 'green')
    fs.rmdirSync(tsConfig.compilerOptions.outDir, {
      recursive: true,
      force: true
    })
  }

  clean()
  build()

  copyPackageJson(packageRootDir)
  copyReadme(packageRootDir)

  if (yargs.watch) {
    args.unshift('--watch')
    log(`Watching for changes in: ${tsConfig.include.join(', ')}`)
    build()
  }
}

const tsConfig = require(path.resolve(yargs.tsConfig))
const packageRootDir = path.resolve('.')
const packageJson = require(path.resolve(packageRootDir, './package.json'))

compile(tsConfig, packageJson, packageRootDir)
