import type {
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  Transform,
} from 'jscodeshift'

import { isImportByPath } from '../../utils'

const inputComponentNames = [
  'Input',
  'NumberInput',
  'Autocomplete',
  'PasswordInput',
  'DatePicker',
  'TimePicker',
  'Select',
  'TagSelector',
]
const ERROR_PROP_NAME = 'error'

const isSpecifierInputField = (
  specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier
) => {
  return (
    specifier.type === 'ImportSpecifier' &&
    specifier.imported?.name &&
    inputComponentNames.includes(specifier.imported?.name)
  )
}

const isPicassoInputFieldImport = (node: ImportDeclaration) =>
  isImportByPath(node, '@toptal/picasso') &&
  !!node.specifiers?.some(specifier => isSpecifierInputField(specifier))

const isErrorAttribute = (path: JSXAttribute) => {
  return path.name?.name === ERROR_PROP_NAME
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)
  const localSpecifiers: string[] = []

  root.find(j.ImportDeclaration, isPicassoInputFieldImport).forEach(path => {
    const specifiers = path.value.specifiers

    specifiers?.forEach(specifier => {
      // collect only input field specifiers
      if (isSpecifierInputField(specifier) && specifier.local?.name) {
        localSpecifiers.push(specifier.local?.name)
      }
    })
  })

  localSpecifiers.forEach(specifier => {
    root
      .findJSXElements(specifier)
      .find(j.JSXAttribute, isErrorAttribute)
      .replaceWith(path => {
        const attributeValue = path.value.value

        if (attributeValue === null) {
          return j.jsxAttribute(
            j.jsxIdentifier('status'),
            j.stringLiteral('error')
          )
        }

        if (
          attributeValue?.type === 'JSXExpressionContainer' &&
          attributeValue?.expression
        ) {
          const { expression } = attributeValue

          // E.g. <Input error={true} />
          if (expression.type === 'BooleanLiteral') {
            return j.jsxAttribute(
              j.jsxIdentifier('status'),
              j.stringLiteral(expression.value ? 'error' : 'default')
            )
          }

          // E.g. <Input error={error} />
          if (expression.type === 'Identifier') {
            const conditionalExpression = j.conditionalExpression(
              expression,
              j.stringLiteral('error'),
              j.stringLiteral('default')
            )

            return j.jsxAttribute(
              j.jsxIdentifier('status'),
              j.jsxExpressionContainer(conditionalExpression)
            )
          }

          // E.g. <Input error={hasError || isValid} />
          if (expression.type === 'LogicalExpression') {
            const logicalExpression = j.logicalExpression(
              expression.operator,
              expression.left,
              expression.right
            )

            const conditionalExpression = j.conditionalExpression(
              logicalExpression,
              j.stringLiteral('error'),
              j.stringLiteral('default')
            )

            return j.jsxAttribute(
              j.jsxIdentifier('status'),
              j.jsxExpressionContainer(conditionalExpression)
            )
          }
        }
      })
  })

  return root.toSource({ quote: 'single' })
}

export default transform
