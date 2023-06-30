import { createCommand } from 'lexical'
import type { LexicalCommand } from 'lexical'

import type { CustomEmojiPayload } from '../nodes/CustomEmojiNode'

export const INSERT_EMOJI_COMMAND: LexicalCommand<string> = createCommand(
  'INSERT_EMOJI_COMMAND'
)

export const INSERT_CUSTOM_EMOJI_COMMAND: LexicalCommand<CustomEmojiPayload> =
  createCommand('INSERT_CUSTOM_EMOJI_COMMAND')
