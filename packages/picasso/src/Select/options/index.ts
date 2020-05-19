import { Option } from '../types'
import { EMPTY_INPUT_VALUE } from '../useSelect'

export { default as NativePlaceholder } from './NativePlaceholder'
export { default as NativeOptionsList } from './NativeOptionsList'
export { default as OptionsList } from './OptionsList'

export const getOptionText = (option: Option | null) =>
  (option && option.text) || EMPTY_INPUT_VALUE

export const removeDuplicatedOptions = (options: Option[]) =>
  options.filter((option, index) => {
    const innerIndex = options.findIndex(
      innerOption => innerOption.value === option.value
    )
    return innerIndex === index
  })
