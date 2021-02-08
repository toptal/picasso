import { EMPTY_INPUT_VALUE } from '../constants'
import { Option } from '../../types'

const getOptionText = (option: Option | null) =>
  (option && option.text) || EMPTY_INPUT_VALUE

export default getOptionText
