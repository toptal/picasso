import type {
  JSXAttribute,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXSpreadAttribute,
  Transform,
} from 'jscodeshift'

import { AFFECTED_ATTRIBUTES, AFFECTED_COMPONENTS } from './config'
import type { ManuallyFixableCase, TransformationOptions } from './types'
import {
  reportManuallyFixableCases,
  insertSpacingImport,
  getUpdatedNode,
} from './utils'

const isJSXAttribute = (
  attribute: JSXSpreadAttribute | JSXAttribute
): attribute is JSXAttribute => !!(attribute as any).name?.name
const isJSXMemberExpression = (
  element: JSXIdentifier | JSXNamespacedName | JSXMemberExpression
): element is JSXMemberExpression => !(element as any).name

const transform: Transform = (file, api) => {
  const spacingsToImport: string[] = []
  const manuallyFixableCases: ManuallyFixableCase[] = []

  const j = api.jscodeshift
  const ast = j(file.source)

  ast
    .find(j.JSXElement)
    .filter(path => {
      if (isJSXMemberExpression(path.node.openingElement.name)) {
        return false
      }

      if (typeof path.node.openingElement.name.name !== 'string') {
        return false
      }

      return AFFECTED_COMPONENTS.includes(path.node.openingElement.name.name)
    })
    .forEach(element => {
      const updatedElementAttributes =
        element.node.openingElement.attributes?.map(attribute => {
          if (!isJSXAttribute(attribute)) {
            return attribute
          }

          const attributeName = attribute.name.name
          const ignoreAttribute =
            !(typeof attributeName === 'string') ||
            !AFFECTED_ATTRIBUTES.includes(attributeName)

          if (ignoreAttribute) {
            return attribute
          }

          // Populate "manuallyFixableCases" and "spacingsToImport" as transformations are happening
          // deeper and deeper in attribute value node
          const transformationOptions: TransformationOptions = {
            api,
            reportManuallyFixableCase: () => {
              if (isJSXMemberExpression(element.value.openingElement.name)) {
                return
              }

              if (typeof element.value.openingElement.name.name !== 'string') {
                return
              }

              manuallyFixableCases.push({
                componentName: element.value.openingElement.name.name,
                attributeName,
                location: `${file.path}:${element.value.loc?.start.line}`,
              })
            },
            addSpacingImport: spacingIdentifier =>
              spacingsToImport.push(spacingIdentifier),
          }

          if (attribute.value?.type === 'JSXExpressionContainer') {
            const updatedNode = getUpdatedNode(
              attribute.value.expression,
              transformationOptions
            )

            attribute.value.expression = updatedNode
          } else if (attribute.value) {
            const updatedNode = getUpdatedNode(
              attribute.value,
              transformationOptions
            )

            attribute.value =
              api.jscodeshift.jsxExpressionContainer(updatedNode)
          }

          return attribute
        })

      element.node.openingElement.attributes = updatedElementAttributes
    })

  if (spacingsToImport.length > 0) {
    insertSpacingImport(api, ast, spacingsToImport)
  }

  if (manuallyFixableCases.length > 0) {
    reportManuallyFixableCases(manuallyFixableCases)
  }

  return ast.toSource({ quote: 'single' })
}

export default transform
