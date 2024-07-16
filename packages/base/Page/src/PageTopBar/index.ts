import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageTopBar'

export { default as PageTopBar } from './PageTopBar'
export { PageTopBarContext } from './PageTopBar'
export type PageTopBarProps = OmitInternalProps<Props>
export * from './constants'
