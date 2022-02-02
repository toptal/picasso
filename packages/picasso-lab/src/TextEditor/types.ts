import { MouseEventHandler, ChangeEvent } from 'react'

export type HeaderValueType = '3' | ''

export type TextEditorChangeHandler = (value: string) => void

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValueType
  }>
) => void
