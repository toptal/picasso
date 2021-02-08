import { ValueType, Option, Selection } from '../../types'
import isOptionInSelectedValues from '../is-option-in-selected-values'
import isEmpty from '../is-empty'

const getMultipleSelection = (
  options: Option[],
  value: ValueType[]
): Selection => {
  const getSelectedOptions = () =>
    options.filter(option => isOptionInSelectedValues(option, value))

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getSelectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value),
    isOptionSelected: option => isOptionInSelectedValues(option, value)
  }
}

export default getMultipleSelection
