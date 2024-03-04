import type {
  DateOrDateRangeType,
  FileUpload,
  AvatarUploadFileUpload,
  AutocompleteItem as Item,
} from '@toptal/picasso'

export type ValueType =
  | string
  | string[]
  | number
  | boolean
  | null
  | undefined
  | AvatarUploadFileUpload
  | FileUpload[]
  | DateOrDateRangeType
  | Item
  | Item[]

export interface IFormComponentProps {
  value?: ValueType
}
