import { isSubstring } from '../../../utils'
import type { Option, OptionGroups } from '../../types'
import isOptionsType from '../../utils/is-options-type'
import getOptionText from '../get-option-text'

interface Props {
  options: Option[] | OptionGroups
  filterOptionsValue: string
  getDisplayValue: (option: Option | null) => string
  filterFlatOptions?: (
    options: Option[],
    filterOptionsValue: string,
    getDisplayValue: (option: Option | null) => string
  ) => Option[]
}

const filterOptions = ({
  options,
  filterOptionsValue,
  getDisplayValue,
  filterFlatOptions: filterFlatOptionsFunction = filterFlatOptions,
}: Props): Option[] | OptionGroups => {
  if (isOptionsType(options)) {
    return filterFlatOptionsFunction(
      options,
      filterOptionsValue,
      getDisplayValue
    )
  }

  return Object.keys(options).reduce((result: OptionGroups, group) => {
    const filteredFlatOptions = filterFlatOptionsFunction(
      options[group],
      filterOptionsValue,
      getDisplayValue
    )

    if (filteredFlatOptions.length > 0) {
      result[group] = filteredFlatOptions
    }

    return result
  }, {})
}

export const filterFlatOptions = (
  options: Option[],
  filterOptionsValue: string,
  getDisplayValue: (option: Option | null) => string = getOptionText
): Option[] =>
  options.filter(option =>
    isSubstring(filterOptionsValue, getDisplayValue(option))
  )

export default filterOptions
