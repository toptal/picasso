import { OmitInternalProps } from '@toptal/picasso-shared'

export { default } from './List'
import { Props } from './List'
export type ListProps = OmitInternalProps<Props>
