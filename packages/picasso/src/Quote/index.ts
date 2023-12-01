/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Quote'

export { default } from './Quote'
export type QuoteProps = OmitInternalProps<Props>
