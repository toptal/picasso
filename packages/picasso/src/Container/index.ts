import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './Container'
import { Props } from './Container'
export type ContainerProps = OmitInternalProps<Props>
export * from './Container'
