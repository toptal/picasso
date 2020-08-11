export type Option<T extends string | number = string | number> = {
  key?: number
  text: string
  description?: string
  value: T
  [prop: string]: string | number | undefined
}
