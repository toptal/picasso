import type { TransformationOptions } from '../types'

export const NUMERIC_VALUE_TO_SPACING_CONSTANTS = [
  { value: 0, name: 'SPACING_0' },
  { value: 0.25, name: 'SPACING_1' },
  { value: 0.5, name: 'SPACING_2' },
  { value: 0.75, name: 'SPACING_3' },
  { value: 1, name: 'SPACING_4' },
  { value: 1.5, name: 'SPACING_6' },
  { value: 2, name: 'SPACING_8' },
  { value: 2.5, name: 'SPACING_10' },
  { value: 3, name: 'SPACING_12' },
]

export const getNodeForNumber = (
  node: any,
  { api, reportManuallyFixableCase, addSpacingImport }: TransformationOptions
) => {
  const numericValue = node.value
  const spacing = NUMERIC_VALUE_TO_SPACING_CONSTANTS.find(
    ({ value }) => value === numericValue
  )

  if (spacing) {
    addSpacingImport(spacing.name)

    return api.jscodeshift.identifier(spacing.name)
  }
  reportManuallyFixableCase()

  return node
}
