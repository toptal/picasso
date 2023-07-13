import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { $createTextNode, $insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical'
import React, { useCallback, useEffect } from 'react'

import { RichTextEditorEmojiPicker } from '../../RichTextEditorEmojiPicker/RichTextEditorEmojiPicker'
import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar, useRTEPluginContext } from '../api'
import { INSERT_CUSTOM_EMOJI_COMMAND, INSERT_EMOJI_COMMAND } from './commands'
import {
  $createCustomEmojiNode,
  CustomEmojiNode,
} from './nodes/CustomEmojiNode'
import type { CustomEmojiGroup, CustomEmojiPayload, Emoji } from './types'

const PLUGIN_NAME = 'emoji'

export type Props = {
  customEmojis?: CustomEmojiGroup[]
}

const EmojiPlugin: RTEPlugin<Props> = ({ customEmojis }: Props) => {
  const [editor] = useLexicalComposerContext()
  const { disabled } = useRTEPluginContext()

  const handleInsertEmoji = useCallback(
    (emoji: Emoji) => {
      const isNativeEmoji = 'native' in emoji
      const isCustomEmoji = 'src' in emoji

      if (isNativeEmoji) {
        editor.dispatchCommand(INSERT_EMOJI_COMMAND, emoji.native)
      }

      if (isCustomEmoji) {
        editor.dispatchCommand(INSERT_CUSTOM_EMOJI_COMMAND, {
          src: emoji.src,
          id: emoji.id,
        })
      }
    },
    [editor]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_EMOJI_COMMAND,
        (nativeEmoji: string) => {
          $insertNodes([$createTextNode(nativeEmoji)])

          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        INSERT_CUSTOM_EMOJI_COMMAND,
        (customEmojiPayload: CustomEmojiPayload) => {
          const emojiNode = $createCustomEmojiNode(customEmojiPayload)

          $insertNodes([emojiNode])

          return true
        },
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [editor])

  return (
    <Toolbar keyName={PLUGIN_NAME}>
      <RichTextEditorEmojiPicker
        customEmojis={customEmojis}
        onInsertEmoji={handleInsertEmoji}
        disabled={disabled}
      />
    </Toolbar>
  )
}

EmojiPlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [CustomEmojiNode],
  },
}

export default EmojiPlugin
