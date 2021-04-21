import { Option, OptionGroups } from '../../types'

export const isOptionsType = (input: Option[] | OptionGroups): input is Option[] =>
  Array.isArray(input)

export default isOptionsType
