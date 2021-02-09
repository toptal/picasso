import { ValueType, Option } from '../../types'
import isOptionInSelectedValues from '../is-option-in-selected-values'

const toggleMultipleSelectValue = (value: ValueType[], option: Option) => {
  const isInSelectedValues = isOptionInSelectedValues(option, value)

  if (isInSelectedValues) {
    return value.filter(valueItem => valueItem !== option.value)
  }

  return [...value, String(option.value)]
}

export default toggleMultipleSelectValue
