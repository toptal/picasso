import { ValueType, Option } from './types'

export const isEmpty = (value?: ValueType | ValueType[]) =>
  Array.isArray(value) ? value.length === 0 : value === ''

export type Selection = {
  isSelected(): boolean
  isOptionSelected(option: Option): boolean
  isOptionCheckmarked(option: Option): boolean
  display(getDisplayValue: (option: Option | null) => string): string
}

const getMultipleSelection = (
  options: Option[],
  value: ValueType[]
): Selection => {
  const getSelectedOptions = () =>
    options.filter(option => value.includes(String(option.value)))

  return {
    display: (getDisplayValue: (option: Option | null) => string) =>
      getSelectedOptions()
        .map(getDisplayValue)
        .join(', '),
    isSelected: () => !isEmpty(value),
    isOptionSelected: () => false,
    isOptionCheckmarked: option => value.includes(String(option.value))
  }
}

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
    isOptionSelected: option => String(option.value) === value,
    isOptionCheckmarked: () => false
  }
}

export const getSelection = (
  options: Option[],
  value?: ValueType | ValueType[]
) =>
  Array.isArray(value)
    ? getMultipleSelection(options, value as ValueType[])
    : getSingleSelection(options, value as ValueType | undefined)
