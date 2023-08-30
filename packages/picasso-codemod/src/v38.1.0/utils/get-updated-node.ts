import type { TransformationOptions } from '../types'
import { getNodeForNumber } from './get-node-for-number'
import { getNodeForSizeStringConstant } from './get-node-for-size-string-constant'

export const getUpdatedNode = (node: any, options: TransformationOptions) => {
  const { reportManuallyFixableCase } = options

  if (node.type === 'StringLiteral') {
    node = getNodeForSizeStringConstant(node, options)
  } else if (node.type === 'NumericLiteral') {
    node = getNodeForNumber(node, options)
  } else if (node.type === 'ObjectExpression') {
    const updatedProperties = node.properties.map((property: any) => {
      property.value = getUpdatedNode(property.value, options)

      return property
    })

    node.properties = updatedProperties
  } else if (node.type === 'ConditionalExpression') {
    node.consequent = getUpdatedNode(node.consequent, options)
    node.alternate = getUpdatedNode(node.alternate, options)
  } else {
    reportManuallyFixableCase()
  }

  return node
}
