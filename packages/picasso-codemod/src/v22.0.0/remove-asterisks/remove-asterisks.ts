import {
  ASTNode,
  ConditionalExpression,
  JSCodeshift,
  StringLiteral,
  Transform,
  JSXExpressionContainer
} from 'jscodeshift'

interface ActionInterface {
  type: 'replaceWith' | 'remove'
  param?: ASTNode
}

const getStringValue = (node: ASTNode): string => {
  if (node.type !== 'StringLiteral') {
    return ''
  }

  return node.value
}

const getActionFromLiteral = (
  attribute: StringLiteral,
  j: JSCodeshift
): ActionInterface => {
  if (attribute.value === 'optional') {
    return {
      type: 'replaceWith',
      param: j.jsxAttribute(j.jsxIdentifier('optional'))
    }
  }

  return {
    type: 'remove'
  }
}

const getActionFromExpression = (
  attribute: JSXExpressionContainer,
  j: JSCodeshift
): ActionInterface => {
  const { alternate, consequent, test } =
    attribute.expression as ConditionalExpression

  const consequentString = getStringValue(consequent)
  const alternateString = getStringValue(alternate)

  if (consequentString !== 'optional' && alternateString !== 'optional') {
    return {
      type: 'remove'
    }
  }

  const isOptionalConsequent = consequentString === 'optional'

  const replacementParam = j.jsxAttribute(
    j.jsxIdentifier('optional'),
    j.jsxExpressionContainer(
      isOptionalConsequent
        ? test
        : test.type === 'UnaryExpression'
        ? test.argument
        : j.unaryExpression('!', test)
    )
  )

  return {
    type: 'replaceWith',
    param: replacementParam
  }
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  // remove `requiredVariant` from FormConfigContext
  // usages: https://github.com/search?q=org%3Atoptal+RequiredVariant+-repo%3Atoptal%2Fpicasso&type=code
  root
    .find(j.Identifier, { name: 'requiredVariant' })
    .filter(({ parentPath }) => parentPath.value.type === 'ObjectProperty')
    .forEach(({ parentPath }) => j(parentPath).remove())

  // replace `requiredDecoration` with `optional` on FormLabel
  // usages: https://github.com/search?q=org%3Atoptal+requiredDecoration+-repo%3Atoptal%2Fpicasso&type=code
  root
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'requiredDecoration'
      }
    })
    .forEach(attribute => {
      const value = attribute.value.value

      // if attribute is empty, don't do anything
      if (!value) {
        return
      }

      const type = value!.type
      let action

      if (type === 'StringLiteral') {
        action = getActionFromLiteral(value, j)
      } else if (
        type === 'JSXExpressionContainer' &&
        value.expression.type === 'ConditionalExpression'
      ) {
        action = getActionFromExpression(value, j)
      }

      if (action) {
        j(attribute)[action.type](action.param)
      }
    })

  return root.toSource({ quote: 'single' })
}

export default transform
