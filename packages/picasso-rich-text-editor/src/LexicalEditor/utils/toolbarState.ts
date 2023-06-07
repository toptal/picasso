import type { LexicalEditor } from 'lexical'

// Currently, not all the types are used, but it's a foundation for the future code
// based on states present in the original PoC https://github.com/toptal/picasso/pull/3505/files
export type ToolbarState = {
  isBold: boolean
  isItalic: boolean
  isEditable: boolean
  list: 'bullet' | 'ordered' | false
  header: '3' | ''
  link: string
  activeEditor: LexicalEditor
}

export enum ToolbarActions {
  UPDATE_VISUAL_STATE,
  UPDATE_ACTIVE_EDITOR,
  UPDATE_IS_EDITABLE,
}

// When adding a new action type, make sure to add it to the ToolbarAction union type
type ToolbarVisualStateUpdateAction = {
  type: ToolbarActions.UPDATE_VISUAL_STATE
  value: {
    isBold: boolean
    isItalic: boolean
  }
}
type ToolbarUpdateEditorAction = {
  type: ToolbarActions.UPDATE_ACTIVE_EDITOR
  value: LexicalEditor
}
type ToolbarUpdateEditableAction = {
  type: ToolbarActions.UPDATE_IS_EDITABLE
  value: boolean
}

export type ToolbarAction =
  | ToolbarVisualStateUpdateAction
  | ToolbarUpdateEditorAction
  | ToolbarUpdateEditableAction

export const toolbarStateReducer = (
  state: ToolbarState,
  action: ToolbarAction
): ToolbarState => {
  switch (action.type) {
    // Update the visual state of the toolbar all at once (bold, italic, etc.)
    // Since this is called when updating toolbar state on selection change, we can do all updates in one action
    case ToolbarActions.UPDATE_VISUAL_STATE:
      return {
        ...state,
        isBold: action.value.isBold,
        isItalic: action.value.isItalic,
      }
    case ToolbarActions.UPDATE_ACTIVE_EDITOR:
      return {
        ...state,
        activeEditor: action.value,
      }
    case ToolbarActions.UPDATE_IS_EDITABLE:
      return {
        ...state,
        isEditable: action.value,
      }
    default:
      return state
  }
}
