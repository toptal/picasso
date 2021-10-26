import { Option, OptionGroups } from '../../types'
import { isOptionsType } from '..'

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
