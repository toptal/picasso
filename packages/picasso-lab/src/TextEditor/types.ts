import { RangeStatic, Sources } from 'quill'
import Delta from 'quill-delta'

import { EditorActionsType, EditorStateType } from './store/editor/types'
import { ToolbarActionsType, ToolbarStateType } from './store/toolbar/types'

export type HTMLString = string

export type HeaderValueType = '3' | ''

export type TextEditorChangeHandler = (value: HTMLString) => void

type EditorEventName = 'text-change' | 'selection-change'

/**
 * depends on name, we receive [delta, oldDelta, sources] or [range, oldRange, sources]
 */
export type EditorChangeHandler<N extends EditorEventName = EditorEventName> = (
  eventName: N,
  ...args: N extends 'text-change'
    ? [Delta, Delta, Sources]
    : [RangeStatic, RangeStatic, Sources]
) => void

export type StateType = {
  toolbar: ToolbarStateType
  editor: EditorStateType
}

export type ActionsType = ToolbarActionsType | EditorActionsType
