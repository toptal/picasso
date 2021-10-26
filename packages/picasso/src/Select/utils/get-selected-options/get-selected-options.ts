import { Option, ValueType } from '../../types'

const getSelectedOptions = (
  flatOptions: Option[],
  value?: ValueType | ValueType[]
) => {
  const valuesSet = new Set(Array.isArray(value) ? value : [value])

  return flatOptions.filter(option => valuesSet.has(String(option.value)))
}

export default getSelectedOptions
