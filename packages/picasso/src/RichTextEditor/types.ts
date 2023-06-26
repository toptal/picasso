import type { ChangeHandler } from '../QuillEditor'

export type RichTextEditorChangeHandler = ChangeHandler

export type CounterMessageSetter = (
  limit: number,
  currLength: number,
  isError: boolean
) => string

export type { CustomEmojiGroup, CustomEmoji } from '../QuillEditor'
