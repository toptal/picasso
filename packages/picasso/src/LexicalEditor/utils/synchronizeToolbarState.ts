import { $getSelection, $isRangeSelection } from 'lexical'

import type { ToolbarAction } from './toolbarState'
import { ToolbarActions } from './toolbarState'

// Transfers updated Lexical selection state to the toolbar state
// This takes care of highlighting the necessary buttons depending on the selection contents
export const synchronizeToolbarState = (
  dispatch: (value: ToolbarAction) => void
) => {
  const selection = $getSelection()

  if ($isRangeSelection(selection)) {
    dispatch({
      type: ToolbarActions.UPDATE_VISUAL_STATE,
      value: {
        isBold: selection.hasFormat('bold'),
        isItalic: selection.hasFormat('italic'),
      },
    })
  }
}
