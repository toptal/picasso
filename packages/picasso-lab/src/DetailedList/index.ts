import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './DetailedList'

export type DetailedListProps = OmitInternalProps<Props>

export { default } from './DetailedList'
export { Item } from './types'
