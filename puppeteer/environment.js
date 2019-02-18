const JestPuppeteer = require('jest-environment-puppeteer')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const esprima = require('esprima')
const walk = require('esprima-walk')

const config = require('./config')

class Storyshots extends JestPuppeteer {
  async setup () {
    await super.setup()
    const stories = await this.loadStoryShots()

    this.global.__STORYSHOTS__ = stories
  }

  runScript (script) {
    return super.runScript(script)
  }

  loadStoryShots () {
    return new Promise((resolve, reject) => {
      glob(
        path.resolve(process.cwd(), config.storyShotsPattern),
        (err, files) => {
          if (err) {
            reject(err)
          }

          const tree = []

          files.forEach(file => {
            const currentTest = {
              tests: [],
              file
            }
            const source = fs.readFileSync(file, 'utf-8')

            try {
              const program = esprima.parseModule(source, {
                loc: true,
                comment: true,
                attachComment: true,
                jsx: true
              })

              walk(program, node => {
                if (
                  node.type === 'CallExpression' &&
                  node.callee.type === 'MemberExpression'
                ) {
                  if (node.callee.property.name === 'createPage') {
                    currentTest.name = node.arguments[0].value
                  }

                  if (node.callee.property.name === 'lookupPage') {
                    currentTest.name = node.arguments[0].value
                  }

                  if (node.callee.property.name === 'addExample') {
                    // check if should be skipped
                    const comment = program.comments.find(
                      cmnt =>
                        cmnt.loc.start.line ===
                          node.callee.property.loc.start.line &&
                        cmnt.value.includes('picasso-skip-visuals')
                    )

                    if (comment) {
                      return
                    }

                    const nameArgument = node.arguments[1]

                    if (nameArgument.type === 'Literal') {
                      currentTest.tests.push(nameArgument.value)
                    }

                    if (nameArgument.type === 'ObjectExpression') {
                      const title = nameArgument.properties.find(
                        property => property.key.name === 'title'
                      )

                      currentTest.tests.push(title.value.value)
                    }
                  }
                }
              })
              tree.push(currentTest)
            } catch (e) {
              reject(e)
              throw new Error(`Failed to parse module '${file}'`)
            }
          })

          resolve(tree)
        }
      )
    })
  }
}

module.exports = Storyshots
