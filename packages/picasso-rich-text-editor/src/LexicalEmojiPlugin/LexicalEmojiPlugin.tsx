import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { useEffect } from 'react'
import { $createTextNode, $insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical'

import { INSERT_CUSTOM_EMOJI_COMMAND, INSERT_EMOJI_COMMAND } from './commands'
import { $createCustomEmojiNode } from './nodes/CustomEmojiNode'
import type { CustomEmojiPayload } from './types'

const LexicalEmojiPlugin = () => {
  const [editor] = useLexicalComposerContext()

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

  return null
}

export default LexicalEmojiPlugin
