import type { TransformationOptions } from '../types'

export const SIZE_TO_SPACING_CONSTANT: Record<string, string> = {
  xsmall: 'SPACING_2',
  small: 'SPACING_4',
  medium: 'SPACING_6',
  large: 'SPACING_8',
  xlarge: 'SPACING_10',
}

export const getNodeForSizeStringConstant = (
  node: any,
  { api, addSpacingImport }: TransformationOptions
) => {
  const spacingConstant = node.value
  const spacingName = SIZE_TO_SPACING_CONSTANT[spacingConstant]

  if (!spacingName) {
    throw new Error(
      `Unable to match "${spacingConstant}" size string constant to BASE spacing`
    )
  }

  addSpacingImport(spacingName)

  return api.jscodeshift.identifier(spacingName)
}
