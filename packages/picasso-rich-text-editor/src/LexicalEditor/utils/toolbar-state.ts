import type { FormatType, HeaderValue } from '../../RichTextEditorToolbar'

export type ToolbarState = FormatType

export enum ToolbarActions {
  UPDATE_VISUAL_STATE,
}

// When adding a new action type, make sure to add it to the ToolbarAction union type
type ToolbarVisualStateUpdateAction = {
  type: ToolbarActions.UPDATE_VISUAL_STATE
  value: {
    bold: boolean
    italic: boolean
    list: ToolbarState['list']
    header: HeaderValue
  }
}

export type ToolbarAction = ToolbarVisualStateUpdateAction

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
        bold: action.value.bold,
        italic: action.value.italic,
        list: action.value.list,
        header: action.value.header,
      }
    default:
      return state
  }
}
