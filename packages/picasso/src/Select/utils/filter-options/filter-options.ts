import { Option, OptionGroups } from '../../types'
import { isOptionsType } from '../../utils'
import { isSubstring } from '../../../utils'

interface Props {
  options: Option[] | OptionGroups
  filterOptionsValue: string,
  getDisplayValue: (option: Option | null) => string
}

const filterOptions = ({
  options,
  filterOptionsValue,
  getDisplayValue
}: Props): Option[] | OptionGroups => {
  if (isOptionsType(options)) {
    return filterFlatOptions({ options, filterOptionsValue, getDisplayValue })
  }

  return Object.keys(options)
    .reduce((result: OptionGroups, group) => {
      const filteredFlatOptions = filterFlatOptions(
        { options: options[group], filterOptionsValue, getDisplayValue }
      )

      if (filteredFlatOptions.length > 0) {
        result[group] = filteredFlatOptions
      }

      return result
    }, {})
}

const filterFlatOptions = ({
  options,
  filterOptionsValue,
  getDisplayValue
}: Props & { options: Option[] }): Option[] =>
  options.filter(option =>
    isSubstring(filterOptionsValue, getDisplayValue(option))
  )

export default filterOptions
