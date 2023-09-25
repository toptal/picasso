import type { SpacingType } from '@toptal/picasso-provider/Picasso/config'
import { isPicassoSpacing } from '@toptal/picasso-provider/Picasso/config'

const filterOutStringAndPicassoSpacing = (value?: SpacingType) =>
  typeof value === 'string' || (value && isPicassoSpacing(value))
    ? undefined
    : value

export default filterOutStringAndPicassoSpacing
