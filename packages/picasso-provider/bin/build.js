/* eslint-disable func-style */

const path = require('path')
const sh = require('shelljs')

const { log, safeExec } = require('../../../bin/utils')

// typescript doesn't copy binaries, so we need to do it manually
function copyIcons () {
  log('Copying favicons', 'green')
  ;['temploy', 'staging', 'development', 'production'].forEach(env => {
    sh.cp(
      '-R',
      `src/Favicon/icons/${env}/*.png`,
      `./dist-package/Favicon/icons/${env}/`
    )
  })
}

const cmd =
  path.resolve(__dirname, '../../../bin/build.js') +
  ' --tsConfig=./tsconfig.build.json'

function build () {
  safeExec('node ' + cmd)

  copyIcons()
}

build()
