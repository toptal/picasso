import { Option, OptionGroups } from '../../types'
import { isOptionsType } from '../../utils'

const flattenOptions = (options: Option[] | OptionGroups): Option[] => {
  if (isOptionsType(options)) {
    return options
  }

  return Object.values(options).reduce(
    (result: Option[], optionList) => result.concat(optionList),
    []
  )
}

export default flattenOptions
