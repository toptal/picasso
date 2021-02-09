import { ValueType, Option } from '../../types'
import getMultipleSelection from '../get-multiple-selection'
import getSingleSelection from '../get-single-selection'

const getSelection = (options: Option[], value?: ValueType | ValueType[]) =>
  Array.isArray(value)
    ? getMultipleSelection(options, value as ValueType[])
    : getSingleSelection(options, value as ValueType | undefined)

export default getSelection
