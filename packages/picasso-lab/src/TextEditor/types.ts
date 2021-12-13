import { MutableRefObject } from 'react'
import Quill from 'quill'

export type EditorRefType = MutableRefObject<Quill | undefined>

export type HTMLString = string

export type TextEditorChangeHandler = (value: HTMLString) => void
