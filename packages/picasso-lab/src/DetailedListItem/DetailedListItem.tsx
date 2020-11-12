import { ReactNode } from 'react'

export interface Props {
  /** Item label */
  label: string
  /** Item value */
  value: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DetailedListItem = (props: Props) => {
  return null
}

DetailedListItem.defaultProps = {}
DetailedListItem.displayName = 'DetailedListItem'

export default DetailedListItem
