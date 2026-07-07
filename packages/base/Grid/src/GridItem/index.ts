import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props, GridItemSizeProps } from './GridItem'

export { default as GridItem } from './GridItem'
export type GridItemProps = OmitInternalProps<Props>
export type { GridItemSizeProps } from './GridItem'
/** @deprecated Use `GridItemSizeProps` instead. [PF-2208] */
export type GridSizeProps = GridItemSizeProps
