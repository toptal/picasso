import { generateRandomString } from '../../../utils'
import { Option, OptionGroups } from '../../types'
import { isOptionsType } from '../../utils'

const flattenOptions = (options: Option[] | OptionGroups): Option[] => {
  if (isOptionsType(options)) {
    return options
  }

  return Object.entries(options).reduce(
    (result: Option[], [title, optionList]) =>
      result.concat([
        {
          disabled: true,
          text: title,
          value: generateRandomString()
        },
        ...optionList
      ]),
    []
  )
}

export default flattenOptions
