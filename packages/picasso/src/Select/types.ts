export type ValueType = string | number

export type Option<T extends string | number = string | number> = {
  key?: number
  text: string
  description?: string
  value: T
  [prop: string]: string | number | undefined
}

export type ItemProps = {
  role: string
  'aria-selected': boolean
  onMouseEnter: () => void
  onMouseDown: (event: React.MouseEvent) => void
  close: () => void
  onClick: (event: React.MouseEvent) => void
  onItemSelect: (event: React.SyntheticEvent, option: Option | null) => void
}

export type FocusEventType = (event: React.FocusEvent<HTMLInputElement>) => void
