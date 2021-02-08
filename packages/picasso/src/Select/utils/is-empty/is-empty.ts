import { ValueType } from '../../types'

export const isEmpty = (value?: ValueType | ValueType[]) =>
  Array.isArray(value) ? value.length === 0 : value === ''

export default isEmpty
