import React, { ReactNode } from 'react'

export interface Props {
  /** Item label */
  label: ReactNode
  /** Item value */
  children: ReactNode
}

export const DetailedListItem = ({ children }: Props) => <>{children}</>

DetailedListItem.defaultProps = {}
DetailedListItem.displayName = 'DetailedListItem'

export default DetailedListItem
