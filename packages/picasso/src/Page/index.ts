import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Page'

export { default, PageContext } from './Page'
export type PageProps = OmitInternalProps<Props>
