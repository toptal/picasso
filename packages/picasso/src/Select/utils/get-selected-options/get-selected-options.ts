import { Option, OptionGroups, ValueType } from '../../types'
import { getFlatOptions } from '../../utils'

const getSelectedOptions = (
  options: Option[] | OptionGroups,
  value?: ValueType | ValueType[]
) =>
  getFlatOptions(options).filter(option =>
    Array.isArray(value)
      ? value.includes(String(option.value))
      : value === String(option.value)
  )

export default getSelectedOptions
