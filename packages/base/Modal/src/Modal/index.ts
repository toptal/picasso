import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Modal'

export { default as Modal } from './Modal'
export { default as ModalContext } from './ModalContext'
export type ModalProps = OmitInternalProps<Props>
export * from './Modal'
