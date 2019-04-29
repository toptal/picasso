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

const getCodeExampleName = node => {
  const nameArgument = node.arguments[1]

  if (nameArgument.type === 'Literal') {
    return nameArgument.value
  }

  if (nameArgument.type === 'ObjectExpression') {
    const title = nameArgument.properties.find(
      property => property.key.name === 'title'
    )

    return title.value.value
  }
}

const isNodeSkipped = (node, program) => {
  return program.comments.find(
    comment =>
      comment.loc.start.line === node.callee.property.loc.start.line &&
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
  isNodeSkipped
}
