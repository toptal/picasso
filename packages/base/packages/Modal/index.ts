/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Modal'

export { default } from './Modal'
export type ModalProps = OmitInternalProps<Props>
export * from './Modal'
