const JestPuppeteer = require('jest-environment-puppeteer')
const path = require('path')
const fs = require('fs')
const esprima = require('esprima')
const walk = require('esprima-walk')

const { asyncGlob } = require('./utils')
const ast = require('./ast')
const config = require('./config')
const STORIES_PATH = path.resolve(process.cwd(), config.storyShotsPattern)

const ESPRIMA_OPTIONS = {
  loc: true,
  comment: true,
  attachComment: true,
  jsx: true
}

class Storyshots extends JestPuppeteer {
  async setup () {
    await super.setup()

    const stories = await this.loadStoryShots()

    this.global.__STORYSHOTS__ = stories
  }

  async loadStoryShots () {
    const files = await asyncGlob(STORIES_PATH)

    return files.map(Storyshots.processFile)
  }

  static processFile (file) {
    const sourceCode = fs.readFileSync(file, 'utf-8')

    try {
      const program = Storyshots.parseSourceCode(sourceCode)
      const output = {
        ...Storyshots.walk(program),
        file
      }

      return output
    } catch (e) {
      throw new Error(e)
    }
  }

  static parseSourceCode (source) {
    return esprima.parseModule(source, ESPRIMA_OPTIONS)
  }

  static walk (program) {
    const output = {
      name: '',
      tests: []
    }

    walk(program, node => Storyshots.visitor(node, output, program))
    return output
  }

  static visitor (node, output, program) {
    if (ast.isMemberExpression(node)) {
      Storyshots.processAstNode(node, output, program)
    }

    return output
  }

  static processAstNode (node, output, program) {
    if (ast.isPageExpression(node)) {
      output.name = ast.getPageName(node)
    }

    if (ast.isCodeExampleExpression(node)) {
      if (!ast.isNodeSkipped(node, program)) {
        output.tests.push(ast.getCodeExampleName(node))
      }
    }

    return output
  }
}

module.exports = Storyshots
