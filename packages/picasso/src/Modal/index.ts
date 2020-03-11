import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './Modal'
import { Props } from './Modal'
export type ModalProps = OmitInternalProps<Props>
export * from './Modal'
