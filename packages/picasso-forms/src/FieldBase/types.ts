import type { DateOrDateRangeType } from '@toptal/picasso'
import type { Item } from '@toptal/picasso/Autocomplete'
import type { FileUpload } from '@toptal/picasso/FileInput'
import type { FileUpload as AvatarUploadFileUpload } from '@toptal/picasso/AvatarUpload'

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
