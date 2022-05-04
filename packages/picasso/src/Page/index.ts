import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './Page'

export { default } from './Page'
export { PageContext } from './PageContext'
export type PageProps = OmitInternalProps<Props>
