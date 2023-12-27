/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Popper'

export { default } from './Popper'
export type PopperProps = OmitInternalProps<Props>
