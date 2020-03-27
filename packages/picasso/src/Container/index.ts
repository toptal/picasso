import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Container'

export { default } from './Container'
export type ContainerProps = OmitInternalProps<Props>
export * from './Container'
