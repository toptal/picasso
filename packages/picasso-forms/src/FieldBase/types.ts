import type { DateOrDateRangeType } from '@toptal/picasso-calendar'
import type { FileUpload } from '@toptal/picasso-file-input'
import type { FileUpload as AvatarUploadFileUpload } from '@toptal/picasso-avatar-upload'
import type { Item } from '@toptal/picasso-autocomplete'

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
