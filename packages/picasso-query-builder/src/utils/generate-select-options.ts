import { isOptionGroupArray, type OptionList } from 'react-querybuilder'
import type { OptionGroups as SelectOptionGroups } from '@toptal/picasso-select'

export const generateSelectOptions = (options?: OptionList) => {
  if (isOptionGroupArray(options)) {
    const groupOptions: SelectOptionGroups = {}

    options.forEach(option => {
      groupOptions[option.label] = option.options.map(subOption => ({
        value: subOption.name,
        text: subOption.label,
      }))
    })

    return groupOptions
  }

  if (Array.isArray(options)) {
    return options.map(option => ({
      value: option.name,
      text: option.label,
      tooltip: option.tooltip,
    }))
  }

  return []
}
