import { OmitInternalProps } from '@toptal/picasso-shared'

export { default, PageContext } from './Page'
import { Props } from './Page'
export type PageProps = OmitInternalProps<Props>
