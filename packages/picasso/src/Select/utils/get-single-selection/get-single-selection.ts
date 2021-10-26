import { Option, Selection } from '../../types'

const getSingleSelection = (selectedOption: Option | null): Selection => {
  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getDisplayValue(selectedOption),
    isSelected: () => !!selectedOption,
    isOptionSelected: option => option.value === selectedOption?.value
  }
}

export default getSingleSelection
