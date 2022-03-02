import { Item } from '../Autocomplete'
import { DateOrDateRangeType } from '../Calendar'
import { FileUpload } from '../FileInput'

// copied from FieldWrapper to be consistent
export type ValueType =
  | string
  | string[]
  | number
  | boolean
  | null
  | undefined
  | FileUpload[]
  | DateOrDateRangeType
  | Item
  | Item[]

export interface FieldRequirement<TInputType extends ValueType = ValueType> {
  message: string
  validator: (value: TInputType) => boolean
  testIds?: {
    root?: string
    successIcon?: string
    errorIcon?: string
    defaultIcon?: string
  }
}
