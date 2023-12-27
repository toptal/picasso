/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Logo'

export { default } from './Logo'
export type LogoProps = OmitInternalProps<Props>
