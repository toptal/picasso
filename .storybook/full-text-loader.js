const fs = require('fs')
const path = require('path')

const storybookPath = __dirname
const rootPath = path.resolve(storybookPath, '..')
const outputPath = path.resolve(rootPath, './build/storybook')
const indexFile = path.resolve(outputPath, './full-text-index.json')

module.exports = function (source) {
  const filename = this.resourcePath

  const indexFileRawData = fs.readFileSync(indexFile, { flag: 'a+' })
  let indexFileJsonData = indexFileRawData.toString('utf8')
    ? JSON.parse(indexFileRawData)
    : []

  // console.log('processing file:', path.relative(rootPath, filename), source)

  const matches = Array.from(source.matchAll(/\'([\w \`\.]*)\'/g))
  const results = matches.map(m => m[1])

  indexFileJsonData.push({
    file: path.relative(rootPath, filename),
    text: results.join(' '),
  })

  const rawDataToWrite = JSON.stringify(indexFileJsonData, null, 2)
  fs.writeFileSync(indexFile, rawDataToWrite)

  return source
}
