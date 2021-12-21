import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Modal'

export { default } from './Modal'
export { default as ModalContext } from './ModalContext'
export type ModalProps = OmitInternalProps<Props>
export * from './Modal'
