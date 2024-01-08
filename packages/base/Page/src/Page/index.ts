import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Page'

export { default, PageContext } from './Page'
export type { PageContextProps } from './types'
export type PageProps = OmitInternalProps<Props>
