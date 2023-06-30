import type { LexicalEditor } from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $isListNode, ListNode } from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'
import { $isHeadingNode } from '@lexical/rich-text'

import { getLexicalNode } from './getLexicalNode'
import type { ToolbarAction, ToolbarState } from './toolbarState'
import { ToolbarActions } from './toolbarState'
import { ALLOWED_HEADER_TYPE } from '../../RichTextEditorToolbar'

// Transfers updated Lexical selection state to the toolbar state
// This takes care of highlighting the necessary buttons depending on the selection contents
export const synchronizeToolbarState = (
  dispatch: (value: ToolbarAction) => void,
  editor: LexicalEditor
) => {
  const selection = $getSelection()

  let currentListType: ToolbarState['list'] = false

  let isHeading = false

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

      isHeading = $isHeadingNode(node)
    }

    // Approach of getting previous state of the paragraph node and identifying the situation
    // when it was actually cleaned up

    // const selectedNode = getSelectedNode(selection)
    // const parent = selectedNode.getParent()
    // let emptySelectedLine = false

    // if ($isParagraphNode(selectedNode)) {
    //   const previousSelection = $getPreviousSelection()
    //   if ($isRangeSelection(previousSelection)) {

    //     const previouslySelectedNode = getSelectedNode(previousSelection)
    //     console.log('@@@ previous is range selection', previouslySelectedNode)
    //   }

    //   emptySelectedLine = selectedNode.getChildrenSize() === 0
    // }

    // const removeMutationListener = editor.registerMutationListener(
    //   ParagraphNode,
    //   (mutatedNodes) => {
    //     for (let [nodeKey, mutation] of mutatedNodes) {
    //       if (mutation === 'updated') {
    //         editor.getEditorState().read(() => {
    //           const paragraph = $getNodeByKey<ParagraphNode>(nodeKey);
    //           if (paragraph !== null) {
    //             console.log('@@@', paragraph, paragraph.isEmpty())
    //             if (paragraph.isEmpty()) {

    //               dispatch({
    //                 type: ToolbarActions.UPDATE_VISUAL_STATE,
    //                 value: {
    //                   bold: false,
    //                   italic: false,
    //                   list: false,
    //                   header: '',
    //               }})
    //             }
    //           }
    //         })
    //       }
    //     }
    //   },
    // );

    dispatch({
      type: ToolbarActions.UPDATE_VISUAL_STATE,
      value: {
        bold: selection.hasFormat('bold'),
        italic: selection.hasFormat('italic'),
        list: currentListType,
        header: isHeading ? ALLOWED_HEADER_TYPE : '',
      },
    })
  }
}
