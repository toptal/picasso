import React, { useEffect, useReducer } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { noop } from '@toptal/picasso/utils'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import type { ChangeEvent } from 'react'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical'
import { $createHeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'

import {
  registerLexicalEvents,
  synchronizeToolbarState,
  toolbarStateReducer,
} from '../LexicalEditor/utils'
import type {
  CustomEmojiGroup,
  EditorPlugin,
  Emoji,
} from '../LexicalEditor/types'
import {
  INSERT_CUSTOM_EMOJI_COMMAND,
  INSERT_EMOJI_COMMAND,
} from '../LexicalEmojiPlugin/commands'
import type { HeaderValue } from '../RichTextEditorToolbar'
import RichTextEditorToolbar, {
  ALLOWED_HEADER_TYPE,
} from '../RichTextEditorToolbar'

type Props = {
  customEmojis?: CustomEmojiGroup[]
  disabled?: boolean
  toolbarRef: React.RefObject<HTMLDivElement>
  plugins?: EditorPlugin[]
}

const LexicalEditorToolbarPlugin = ({
  disabled = false,
  toolbarRef,
  customEmojis,
  plugins,
}: Props) => {
  const [editor] = useLexicalComposerContext()
  const [{ bold, italic, list, header }, dispatch] = useReducer(
    toolbarStateReducer,
    {
      bold: false,
      italic: false,
      list: false,
      header: '',
      link: '',
    }
  )

  useEffect(() => {
    return registerLexicalEvents({
      editor,
      updateToolbar: () => synchronizeToolbarState(dispatch, editor),
    })
  }, [dispatch, editor])

  const handleBoldClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }
  const handleItalicClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }
  const handleUnorderedClick = () => {
    editor.dispatchCommand(
      list === 'bullet' ? REMOVE_LIST_COMMAND : INSERT_UNORDERED_LIST_COMMAND,
      undefined
    )
  }
  const handleOrderedClick = () => {
    editor.dispatchCommand(
      list === 'ordered' ? REMOVE_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
      undefined
    )
  }

  const handleInsertEmoji = (emoji: Emoji) => {
    const isNativeEmoji = emoji.native
    const isCustomEmoji = emoji.src

    if (isNativeEmoji) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      editor.dispatchCommand(INSERT_EMOJI_COMMAND, emoji.native!)
    }

    if (isCustomEmoji) {
      editor.dispatchCommand(INSERT_CUSTOM_EMOJI_COMMAND, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src: emoji.src!,
        id: emoji.id,
      })
    }
  }

  const handleHeaderClick = ({
    target: { value },
  }: ChangeEvent<{
    value: HeaderValue
  }>) => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        if (value === ALLOWED_HEADER_TYPE) {
          $setBlocksType(selection, () => $createHeadingNode('h3'))
        } else {
          $setBlocksType(selection, () => $createParagraphNode())
        }
      }
    })
  }

  return (
    <RichTextEditorToolbar
      format={{
        bold,
        italic,
        list,
        header,
        link: '',
      }}
      id='toolbar'
      onUnorderedClick={handleUnorderedClick}
      onOrderedClick={handleOrderedClick}
      onBoldClick={handleBoldClick}
      onItalicClick={handleItalicClick}
      onLinkClick={noop}
      onHeaderChange={handleHeaderClick}
      disabled={disabled}
      onInsertEmoji={handleInsertEmoji}
      ref={toolbarRef}
      customEmojis={customEmojis}
      plugins={plugins}
    />
  )
}

export default LexicalEditorToolbarPlugin
