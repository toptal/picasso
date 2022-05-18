import { Option, ValueType } from '../../types'

const isOptionInSelectedValues = (option: Option, value: ValueType[]) =>
  value.includes(String(option.value))

export default isOptionInSelectedValues
