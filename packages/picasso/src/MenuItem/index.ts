import { OmitInternalProps } from '@toptal/picasso-shared'

import { Attributes, Props } from './MenuItem'

export { default } from './MenuItem'
export type MenuItemProps = OmitInternalProps<Props>
export type MenuItemAttributes = Attributes
