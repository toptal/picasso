import React, { useCallback, useEffect, useState } from 'react'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  ListNode,
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type {
  HeadingTagType,
} from '@lexical/rich-text';
import {
  $createHeadingNode,
  $isHeadingNode,
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils'
import cx from 'classnames'
import type {
  NodeKey} from 'lexical';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { sanitizeUrl } from '@braintree/sanitize-url'
import type { ListType } from '@lexical/list'

import styles from './styles'
import getSelectedNode from '../utils/getSelectedNode'
import validateUrl from '../utils/validateUrl'

export const CAN_USE_DOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'

export const IS_APPLE: boolean =
  CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

const blockTypeToBlockName = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  check: 'Check List',
  bullet: 'Bulleted List',
  number: 'Numbered List',
  quote: 'Quote',
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLexicalRTE' })
type Plugin = 'link' | 'table' 

type Props = {
  plugins?: Plugin[],
  config?: {
    headings? : 'h3'[],
  }
  disabled?: boolean
}

const ToolbarPlugin = ({ plugins, config }: Props) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [, setIsEditable] = useState(() => editor.isEditable())
  const [, setSelectedElementKey] = useState<NodeKey | null>(null)
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  // const [isStrikethrough , setIsStrikethrough] = useState(false)

  const classes = useStyles()

  const formatParagraph = () => {
    if (blockType === 'paragraph') {
      return
    }

    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType === headingSize) {
      return
    }

    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize))
      }
    })
  }

  const updateToolbar = useCallback(() => {
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

      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      // setIsStrikethrough(selection.hasFormat('strikethrough'))

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
        updateToolbar()
        setActiveEditor(newEditor)

        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener(editable => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      })
    )
  }, [activeEditor, updateToolbar, editor])

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

  const formatList = (listType: ListType) => {
    if (listType === 'number' && blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else if (listType === 'bullet' && blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const headings = config?.headings ?? ['h1', 'h2', 'h3', 'h4'];
  const toolBarButtons = [
    {
      name: 'B',
      onClick: () => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'),
      isActive: isBold,
      title: IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)',
      ariaLabel: `Format text as bold. Shortcut: ${
          IS_APPLE ? '⌘B' : 'Ctrl+B'
        }`,
    },
    {
      name: <i>I</i>,
      onClick: () => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'),
      isActive: isItalic,
      title: IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)',
      ariaLabel: `Format text as Italic. Shortcut: ${
          IS_APPLE ? '⌘I' : 'Ctrl+I'
        }`,
    },
    {
      name: <u>U</u>,
      onClick: () => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'),
      isActive: isUnderline,
      title: IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)',
      ariaLabel: `Format text as Underline. Shortcut: ${
          IS_APPLE ? '⌘U' : 'Ctrl+U'
        }`,
    },
    {
      name: 'O List',
      onClick: () => formatList('number'),
      isActive: blockType === 'number',
      title: 'Ordered List',
      ariaLabel: `Format text as Underline. Shortcut: ${
          IS_APPLE ? '⌘K' : 'Ctrl+K'
        }`,
    },
    {
      name: 'U List',
      onClick: () => formatList('bullet'),
      isActive: blockType === 'bullet',
      title: 'Unordered List',
      ariaLabel: `Format text as Underline. Shortcut: ${
          IS_APPLE ? '⌘K' : 'Ctrl+K'
        }`,
    },
  ]

  plugins?.includes('link') && toolBarButtons.push({
      name: 'Link',
      onClick: insertLink,
      isActive: isLink,
      title: IS_APPLE ? 'Underline (⌘K)' : 'Underline (Ctrl+K)',
      ariaLabel: `Format text as Underline. Shortcut: ${
          IS_APPLE ? '⌘K' : 'Ctrl+K'
        }`,
    })

  return (
    <div className={classes.toolbar}>
      {blockType in blockTypeToBlockName &&
        activeEditor === editor &&
        headings.map(type => (
          <button
            key={type}
            onClick={() => {
              blockType === type
                ? formatParagraph()
                : formatHeading(type as HeadingTagType)
            }}
            className={cx(
              classes.button,
              blockType === type && classes['button-focus']
            )}
          >
            {type.toUpperCase()}
          </button>
        ))}
      <div className="w-[1px] border-r border-gray-80" />
      { toolBarButtons.map(({ name, onClick, isActive, title, ariaLabel }) => (
        <button
          key={title}
          onClick={onClick}
          className={cx(
            classes.button, isActive && classes['button-focus']
          )}
          title={title}
          aria-label={ariaLabel}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default ToolbarPlugin
