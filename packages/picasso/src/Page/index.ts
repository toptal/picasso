import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Page'

export { default, PageContext } from './Page'
export type PageProps = OmitInternalProps<Props>
