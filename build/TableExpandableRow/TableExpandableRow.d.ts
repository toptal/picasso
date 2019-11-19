import React, { ReactNode, HTMLAttributes } from 'react'
import { BaseProps } from '../Picasso'
export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Collapsible content of `TableExpandableRow` */
  content: ReactNode
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Set a stripe even background for the row */
  stripeEven?: boolean
}
export declare const TableExpandableRow: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLTableRowElement>
>
export default TableExpandableRow
