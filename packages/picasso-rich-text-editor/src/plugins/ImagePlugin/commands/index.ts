import { createCommand } from 'lexical'
import type { LexicalCommand } from 'lexical'

import type { ImageNodePayload } from '../nodes/ImageNode'

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImageNodePayload> =
  createCommand('INSERT_IMAGE_COMMAND')
