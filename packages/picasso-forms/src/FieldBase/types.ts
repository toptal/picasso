import { DateOrDateRangeType } from '@toptal/picasso'
import { Item } from '@toptal/picasso/Autocomplete'
import { FileUpload } from '@toptal/picasso/FileInput'
import { FileUpload as AvatarUploadFileUpload } from '@toptal/picasso/AvatarUpload'

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
