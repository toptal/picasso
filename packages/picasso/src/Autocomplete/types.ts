export type Item = {
  text?: string
  description?: string
  [prop: string]: unknown
}

export type ChangedOptions = {
  isSelected: boolean
}
