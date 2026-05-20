import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Hero'

export { default as Hero } from './Hero'
export type HeroProps = OmitInternalProps<Props>
