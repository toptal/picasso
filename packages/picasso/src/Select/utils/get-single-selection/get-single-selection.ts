import { ValueType, Option, Selection } from '../../types'
import isEmpty from '../is-empty'

const getSingleSelection = (
  options: Option[],
  value?: ValueType
): Selection => {
  const getSelectedOption = () =>
    options.find(option => option.value === value) || null

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getDisplayValue(getSelectedOption()),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => option.value === value
  }
}

export default getSingleSelection
