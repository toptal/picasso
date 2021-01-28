import { Option, ValueType } from '../../types'

const getSelectedOptions = (
  options: Option[],
  value?: ValueType | ValueType[]
) =>
  options.filter(option =>
    Array.isArray(value)
      ? value.includes(String(option.value))
      : value === String(option.value)
  )

export default getSelectedOptions
