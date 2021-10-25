import { UseSelectProps } from '../../types'

export const getUseSelectPropsMock = (): UseSelectProps => {
  return {
    searchInputRef: {
      current: {
        focus: jest.fn()
      } as any
    },
    selectRef: {
      current: {
        focus: jest.fn()
      } as any
    },
    popperRef: {
      current: {
        focus: jest.fn()
      } as any
    },
    selectProps: {
      disabled: false,
      error: false,
      loading: false,
      onChange: jest.fn(),
      onSearchChange: jest.fn(),
      options: [],
      renderOption: jest.fn(),
      getDisplayValue: jest.fn(),
      value: undefined,
      multiple: false,
      native: false,
      enableReset: false
    },
    selectState: {
      isOpen: false,
      canOpen: true,
      open: jest.fn(),
      close: jest.fn(),
      highlightedIndex: 0,
      closeOnEnter: true,
      setHighlightedIndex: jest.fn(),
      setFilterOptionsValue: jest.fn(),
      showSearch: false,
      filterOptionsValue: '',
      displayValue: '',
      selection: {
        isSelected: jest.fn(),
        isOptionSelected: jest.fn(),
        display: jest.fn()
      },
      filteredOptions: [],
      emptySelectValue: '',
      selectedOptions: [],
      setValue: jest.fn(),
      optionsAvailableCount: 0
    }
  }
}
