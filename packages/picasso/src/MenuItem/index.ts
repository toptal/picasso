/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './MenuItem'

export { default } from './MenuItem'
export type MenuItemProps = OmitInternalProps<Props>
export type { MenuItemAttributes } from './MenuItem'
