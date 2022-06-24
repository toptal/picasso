import actionTypes from './actionTypes'

export type HeaderValue = '3' | ''
export type BoldValue = boolean
export type ItalicValue = boolean
export type ListValue = 'bullet' | 'ordered' | false
export type LinkValue = string

export type FormatType = {
  bold: BoldValue
  italic: ItalicValue
  list: ListValue
  header: HeaderValue
  link: LinkValue
}

export type ToolbarStateType = {
  format: FormatType
  disabled: boolean
}

export type SetBoldActionType = {
  type: typeof actionTypes.bold
  payload: ToolbarStateType['format']['bold']
}

export type SetItalicActionType = {
  type: typeof actionTypes.italic
  payload: ToolbarStateType['format']['italic']
}

export type SetListActionType = {
  type: typeof actionTypes.list
  payload: ToolbarStateType['format']['list']
}

export type SetHeaderActionType = {
  type: typeof actionTypes.header
  payload: ToolbarStateType['format']['header']
}

export type SetLinkActionType = {
  type: typeof actionTypes.link
  payload: ToolbarStateType['format']['link']
}

export type SetDisabled = {
  type: typeof actionTypes.disabled
  payload: boolean
}

export type ResetFormatType = {
  type: typeof actionTypes.resetFormat
}

export type ToolbarActionsType =
  | SetBoldActionType
  | SetItalicActionType
  | SetListActionType
  | SetHeaderActionType
  | SetDisabled
  | ResetFormatType
  | SetLinkActionType

export type ToolbarReducerType = (
  state: ToolbarStateType | undefined,
  action: ToolbarActionsType
) => ToolbarStateType
