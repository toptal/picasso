import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './Button'
import { Props } from './Button'
export type ButtonProps = OmitInternalProps<Props>
export * from './Button'
