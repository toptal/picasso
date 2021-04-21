import { Option, OptionGroups, ValueType } from '../../types'
import { flattenOptions } from '../../utils'

const getSelectedOptions = (
  options: Option[] | OptionGroups,
  value?: ValueType | ValueType[]
) =>
  flattenOptions(options).filter(option =>
    Array.isArray(value)
      ? value.includes(String(option.value))
      : value === String(option.value)
  )

export default getSelectedOptions
