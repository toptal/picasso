/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Container'

export { default } from './Container'
export type ContainerProps = OmitInternalProps<Props>
export * from './Container'
