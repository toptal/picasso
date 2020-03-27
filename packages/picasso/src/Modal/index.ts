import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Modal'

export { default } from './Modal'
export type ModalProps = OmitInternalProps<Props>
export * from './Modal'
