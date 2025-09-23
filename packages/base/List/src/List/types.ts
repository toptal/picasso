import type { ReactNode } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import type { ListItemType } from './context'

export type Variant = 'ordered' | 'unordered'

export type Props = BaseProps & {
  children: ReactNode
  /** The variant to use */
  variant?: Variant
  /** Specifies the start value of the first list item in an ordered list */
  start?: number
  /** Style for items bullet/ordinal, can be overridden on a item level */
  styleType?: ListItemType
}
