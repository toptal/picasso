export type IconPosition = 'start' | 'end'

export type ValueType = string | number

export type Option<T extends string | number = string | number> = {
  key?: number
  text: string
  value: T
  [prop: string]: string | number | undefined
}
