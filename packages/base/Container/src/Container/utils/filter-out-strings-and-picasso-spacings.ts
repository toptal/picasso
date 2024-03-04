import type { SpacingType } from '@toptal/picasso-provider'
import { isPicassoSpacing } from '@toptal/picasso-provider'

const filterOutStringAndPicassoSpacing = (value?: SpacingType) =>
  typeof value === 'string' || (value && isPicassoSpacing(value))
    ? undefined
    : value

export default filterOutStringAndPicassoSpacing
