import type { MouseEvent } from 'react'

export type Item = {
  text?: string
  description?: string
  [prop: string]: unknown
}

export type ChangedOptions = {
  isSelected: boolean
}

type BaseItemsProps = {
  role: string
  'aria-selected': boolean
  selected: boolean
  onMouseMove: () => void
  onMouseDown: (event: React.MouseEvent) => void
}

export type GetBaseItemPropsSignature = (index: number) => BaseItemsProps

export type GetItemPropsSignature = (
  index: number,
  item: Item
) => BaseItemsProps

export type GetOtherItemPropsSignature = (
  index: number,
  newValue: string
) => BaseItemsProps & {
  onClick: (event: MouseEvent) => void
}
