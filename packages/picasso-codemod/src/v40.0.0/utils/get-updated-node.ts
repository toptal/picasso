import type {
  ConditionalExpression,
  JSXAttribute,
  JSXExpressionContainer,
  ObjectExpression,
  Property,
} from 'jscodeshift'

import type { TransformationOptions } from '../types'
import { getNodeForNumber } from './get-node-for-number'
import { getNodeForSizeStringConstant } from './get-node-for-size-string-constant'

type NodeType =
  | JSXExpressionContainer['expression']
  | NonNullable<JSXAttribute['value']>

export const getUpdatedNode = (
  node: NodeType,
  options: TransformationOptions
) => {
  const { reportManuallyFixableCase } = options

  if (node.type === 'StringLiteral') {
    node = getNodeForSizeStringConstant(node, options)
  } else if (node.type === 'NumericLiteral') {
    node = getNodeForNumber(node, options)
  } else if (node.type === 'ObjectExpression') {
    const updatedProperties = (node.properties as Property[]).map(property => {
      property.value = getUpdatedNode(
        property.value as NodeType,
        options
      ) as Property['value']

      return property
    }) as ObjectExpression['properties']

    node.properties = updatedProperties
  } else if (node.type === 'ConditionalExpression') {
    node.consequent = getUpdatedNode(
      node.consequent,
      options
    ) as ConditionalExpression['consequent']
    node.alternate = getUpdatedNode(
      node.alternate,
      options
    ) as ConditionalExpression['alternate']
  } else {
    reportManuallyFixableCase()
  }

  return node
}
