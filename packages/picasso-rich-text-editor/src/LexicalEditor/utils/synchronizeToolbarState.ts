import type { LexicalEditor } from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $isListNode, ListNode } from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'

import { getLexicalNode } from './getLexicalNode'
import type { ToolbarAction, ToolbarState } from './toolbarState'
import { ToolbarActions } from './toolbarState'

// Transfers updated Lexical selection state to the toolbar state
// This takes care of highlighting the necessary buttons depending on the selection contents
export const synchronizeToolbarState = (
  dispatch: (value: ToolbarAction) => void,
  editor: LexicalEditor
) => {
  const selection = $getSelection()

  let currentListType: ToolbarState['list'] = false

  if ($isRangeSelection(selection)) {
    const { node, anchorNode, elementDOM } = getLexicalNode(selection, editor)

    if (elementDOM !== null) {
      if ($isListNode(node)) {
        const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
        const type = parentList ? parentList.getListType() : node.getListType()

        // Our existing toolbar state stores ordered lists as 'ordered' and unordered lists as 'bullet'
        // while Lexical stores them as 'number' and 'bullet'
        currentListType = type === 'number' ? 'ordered' : 'bullet'
      }
    }

    dispatch({
      type: ToolbarActions.UPDATE_VISUAL_STATE,
      value: {
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        list: currentListType,
      },
    })
  }
}