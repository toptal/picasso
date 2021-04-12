import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './SelectList'

export { default } from './SelectList'
export type { SelectListNativeProps } from './SelectList'
export type SelectListProps = OmitInternalProps<Props>
