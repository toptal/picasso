// @todo: remove this when we remove the old editor
export type CounterMessageSetter = (
  limit: number,
  currLength: number,
  isError: boolean
) => string

export type { ChangeHandler } from '../LexicalEditor'

// @todo: remove this when we remove the old editor
export type { CustomEmojiGroup, CustomEmoji } from '../QuillEditor'
