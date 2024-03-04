import type { Option, OptionGroups } from '../../types'
import isOptionsType from '../is-options-type'

const countOptions = (options: Option[] | OptionGroups) => {
  if (isOptionsType(options)) {
    return options.length
  }

  return Object.values(options).reduce(
    (result, optionList) => result + optionList.length,
    0
  )
}

export default countOptions
