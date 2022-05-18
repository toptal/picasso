import { DateOrDateRangeType } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { FileUpload } from '@toptal/picasso/FileInput'

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

export interface IFormComponentProps {
  value?: ValueType
}
