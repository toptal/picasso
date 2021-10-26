import { Option, Selection } from '../../types'

const getMultipleSelection = (selectedOptions: Option[]): Selection => {
  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      selectedOptions.map(getDisplayValue).join(', '),
    isSelected: () => selectedOptions.length > 0,
    isOptionSelected: option =>
      selectedOptions.some(
        selectedOption => option.value === String(selectedOption.value)
      )
  }
}

export default getMultipleSelection
