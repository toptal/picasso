import { kebabToCamelCase } from '../../../utils'
import type { ResponsiveSpacingType, SpacingType } from '../../config'
import type { ResponsiveCssProp } from './types'
import { spacingToRem } from '../spacings'

/**
 * Just the default for a value that is not responsive
 * Just set the prop directly on all media queries
 */
export const defaultCssProp = (
  value: Exclude<SpacingType, ResponsiveSpacingType>,
  prop: ResponsiveCssProp
) => ({
  [kebabToCamelCase(prop)]: spacingToRem(value),
})
