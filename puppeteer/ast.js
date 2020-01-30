const escodegen = require('escodegen')

const config = require('./config')

const isMemberExpression = node =>
  node.type === 'CallExpression' && node.callee.type === 'MemberExpression'

const isPageExpression = node =>
  ['createPage'].includes(node.callee.property.name)

const getPageName = node => node.arguments[0].value

const isChapterExpression = node =>
  ['createChapter'].includes(node.callee.property.name)

const getChapterName = node => node.arguments[0].value

const isCodeExampleExpression = node =>
  node.callee.property.name === 'addExample'

const getCodeExampleOptions = node => {
  const optionsAst = node.arguments[1]

  if (!optionsAst || optionsAst.type === 'Literal') {
    return {}
  }

  return optionsAst.properties.reduce((acc, prop) => {
    if (
      prop.value.type === 'ArrowFunctionExpression' ||
      prop.value.type === 'FunctionExpression'
    ) {
      // we add 'return' and call new Function so we can get ordinary function
      // in code example options and that we can use ordinary function notation
      // in .addExample in stories
      const functionBody = `return ${escodegen.generate(prop.value)}`

      return {
        ...acc,
        // eslint-disable-next-line no-new-func
        [prop.key.name]: new Function(functionBody).call()
      }
    }

    return {
      ...acc,
      [prop.key.name]: prop.value.value
    }
  }, {})
}

const getCodeExampleName = node => {
  const nameArgument = node.arguments[1]

  if (nameArgument.type === 'Literal') {
    return nameArgument.value
  }

  if (nameArgument.type === 'ObjectExpression') {
    const title = nameArgument.properties.find(
      property => property.key.name === 'title'
    )

    if (title) {
      return title.value.value
    }

    const id = nameArgument.properties.find(
      property => property.key.name === 'id'
    )

    if (id) {
      return id.value.value
    }

    return null
  }
}

const isNodeSkipped = (node, program) => {
  return program.comments.find(
    comment =>
      comment.loc.start.line >= node.callee.property.loc.start.line &&
      comment.loc.start.line <= node.loc.end.line &&
      comment.value.includes(config.storyShotsIgnoreComment)
  )
}

module.exports = {
  isMemberExpression,
  isPageExpression,
  getPageName,
  isChapterExpression,
  getChapterName,
  isCodeExampleExpression,
  getCodeExampleName,
  getCodeExampleOptions,
  isNodeSkipped
}
