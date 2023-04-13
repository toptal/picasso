import React, { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  ListNode,
} from '@lexical/list'
import { sanitizeUrl } from '@braintree/sanitize-url'
import type { ListType } from '@lexical/list'
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import type { HeadingTagType } from '@lexical/rich-text'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $setBlocksType } from '@lexical/selection'
import type { NodeKey } from 'lexical'
import {
  $getNearestNodeOfType,
  $findMatchingParent,
  mergeRegister,
} from '@lexical/utils'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  DEPRECATED_$isGridSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'

import RichTextEditorToolbar from '../../RichTextEditorToolbar'
import getSelectedNode from '../utils/getSelectedNode'
import validateUrl from '../utils/validateUrl'

const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  number: 'Numbered List',
  paragraph: 'Normal',
  check: 'Check List',
  h3: 'Heading 3',
} as const

type Props = {
  plugins?: 'link'[]
  disabled: boolean
}

export default function ToolbarPlugin({
  plugins,
  disabled,
}: Props): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [, setSelectedElementKey] = useState<NodeKey | null>(null)
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isLink, setIsLink] = useState(false)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
              const parent = e.getParent()

              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()

          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()

          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName)
          }
        }
      }
    }
  }, [activeEditor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar()
        setActiveEditor(newEditor)

        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, $updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener(editable => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      })
    )
  }, [$updateToolbar, activeEditor, editor])

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()

      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const handleHeading = (event: React.ChangeEvent<{ value: '3' | '' }>) => {
    if (event.target.value === '3') {
      formatHeading('h3')
    } else {
      formatParagraph()
    }
  }

  const formatList = (listType: ListType) => {
    if (listType === 'number' && blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else if (listType === 'bullet' && blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const insertLink = useCallback(() => {
    if (!isLink) {
      const link = window.prompt('URL')

      if (!link || !validateUrl(link)) {
        window.alert('Not valid URL')

        return
      }
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(link))
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const handleBoldClick = () => {
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }
  const handleItalicClick = () => {
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }

  return (
    <RichTextEditorToolbar
      id='toolbar'
      blockType={blockType}
      onUnorderedClick={() => formatList('bullet')}
      onOrderedClick={() => formatList('number')}
      onBoldClick={handleBoldClick}
      onItalicClick={handleItalicClick}
      onLinkClick={insertLink}
      onHeaderChange={handleHeading}
      isLink={isLink}
      isBold={isBold}
      isItalic={isItalic}
      disabled={!isEditable || disabled}
      plugins={plugins}
    />
  )

  // return (
  //   <div className='toolbar'>
  //     <button
  //       disabled={false}
  //       className={'toolbar-item spaced'}
  //       onClick={() => formatList('bullet')}
  //     >
  //       <span className='text'>Bullet List</span>
  //     </button>
  //     <button
  //       disabled={false}
  //       className={'toolbar-item spaced'}
  //       onClick={() => formatList('number')}
  //     >
  //       <span className='text'>Numbered List</span>
  //     </button>
  //   </div>
  // )
}
