import { createCommand } from 'lexical'
import type { LexicalCommand } from 'lexical'

export const TOGGLE_CODE_COMMAND: LexicalCommand<undefined> = createCommand(
  'TOGGLE_CODE_COMMAND'
)
