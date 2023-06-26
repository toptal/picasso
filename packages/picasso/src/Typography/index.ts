import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Typography'

export { default } from './Typography'
export type TypographyProps = OmitInternalProps<Props>

export { default as getTypographyClassName } from './utils/get-typography-class-name'
