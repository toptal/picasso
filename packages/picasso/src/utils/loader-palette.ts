/* eslint-disable import/no-extraneous-dependencies */
import { alpha } from '@toptal/picasso-shared'
import { colors } from '@toptal/picasso-provider'

const loaderColors = {
  foreground: alpha(colors.grey.main2, 0.16),
  background: alpha(colors.grey.main2, 0.04),
}

export default loaderColors
