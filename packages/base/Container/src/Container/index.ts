import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Container'

export { default as Container } from './Container'
export type ContainerProps = OmitInternalProps<Props>
export * from './Container'
