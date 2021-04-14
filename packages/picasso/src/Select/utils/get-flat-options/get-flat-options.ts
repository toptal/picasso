import { Option, OptionGroups } from '../../types'
import { isOptionsType } from '../../utils'

const getFlatOptions = (options: Option[] | OptionGroups): Option[] => {
  if (isOptionsType(options)) {
    return options
  }

  return Object.values(options)
    .reduce((result: Option[], optionList) => [...result, ...optionList], [])
}

export default getFlatOptions
