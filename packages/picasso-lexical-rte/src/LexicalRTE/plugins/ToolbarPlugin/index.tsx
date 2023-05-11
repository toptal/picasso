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
  COMMAND_PRIORITY_NORMAL,
  KEY_MODIFIER_COMMAND,
  DEPRECATED_$isGridSelection
} from 'lexical'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { sanitizeUrl } from '@braintree/sanitize-url'
import type { ListType } from '@lexical/list'

import styles from '../styles'
import { getSelectedNode, validateUrl, CAN_USE_DOM, IS_APPLE } from '../../utils'

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
export type Feature = 'link' | 'table' 
export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type Config = {
  headings? : Heading[],
}

type Props = {
  features: Feature[],
  config?: Config,
  disabled?: boolean
}

const ToolbarPlugin = ({ features, config }: Props) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph')
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [, setSelectedElementKey] = useState<NodeKey | null>(null)
  
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  // const [isStrikethrough , setIsStrikethrough] = useState(false)

  const isLinkAllowed = features.includes('link');
  const classes = useStyles()

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

      if (isLinkAllowed && ($isLinkNode(parent) || $isLinkNode(node))) {
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

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const {code, ctrlKey, metaKey} = event;

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault();
          return activeEditor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl('https://'),
          );
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [activeEditor, isLink]);

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
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
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

   const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

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
      onClick: formatNumberedList,
      isActive: blockType === 'number',
      title: 'Ordered List',
      ariaLabel: `Format text as Underline. Shortcut: ${
          IS_APPLE ? '⌘K' : 'Ctrl+K'
        }`,
    },
    {
      name: 'U List',
      onClick: formatBulletList,
      isActive: blockType === 'bullet',
      title: 'Unordered List',
      ariaLabel: `Format text as Underline. Shortcut: ${
          IS_APPLE ? '⌘K' : 'Ctrl+K'
        }`,
    },
  ]

  isLinkAllowed && toolBarButtons.push({
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
      <div className={classes.divider} />
      { toolBarButtons.map(({ name, onClick, isActive, title, ariaLabel }) => (
        <button
          disabled={!isEditable}
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
