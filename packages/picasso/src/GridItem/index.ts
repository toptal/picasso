/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props, GridSizes } from './GridItem'

export { default } from './GridItem'
export type GridItemProps = OmitInternalProps<Props>
export type GridSizeProps = GridSizes
