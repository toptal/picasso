export type CounterMessageSetter = (
  limit: number,
  currLength: number,
  isError: boolean
) => string

export type {
  ChangeHandler,
  ChangeHandler as RichTextEditorChangeHandler,
  TextLengthChangeHandler,
} from '../LexicalEditor'

export type { CustomEmojiGroup, CustomEmoji } from '../LexicalEditor'
