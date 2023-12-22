const FUNCTION_NAMES = ['usePropDeprecationWarning', 'useDeprecationWarning']

module.exports = {
  'future-proof-deprecation-warning': {
    meta: {
      type: 'suggestion',
      fixable: null,
      docs: {
        description:
          'Ensure a deprecation warning is preceded by a TODO comment',
        category: 'Picasso Best Practices',
        recommended: false,
      },
      schema: [],
    },
    create: function (context) {
      return {
        CallExpression(node) {
          if (FUNCTION_NAMES.includes(node.callee.name)) {
            const sourceCode = context.getSourceCode()
            const commentBefore = sourceCode.getCommentsBefore(node)

            const hasTodoComment = commentBefore.some(
              comment =>
                (comment.type === 'Line' && comment.value.includes('TODO')) ||
                (comment.type === 'Block' && comment.value.includes('TODO'))
            )

            if (!hasTodoComment) {
              context.report({
                node,
                message: `${node.callee.name} must be preceded by a TODO comment `,
              })
            }
          }
        },
      }
    },
  },
}
