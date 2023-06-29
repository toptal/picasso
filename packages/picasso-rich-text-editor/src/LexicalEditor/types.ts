export type SettingName = 'link' | 'emoji'

export type ChangeHandler = (html: string) => void

export type { TextLengthChangeHandler } from '../LexicalTextLengthPlugin'

export type EditorPlugin = SettingName

export type CustomEmoji = {
  id: string
  name: string
  keywords: string[]
  skins: [
    {
      src: string
    }
  ]
}

export type CustomEmojiGroup = {
  id: string
  name: string
  emojis: CustomEmoji[]
}

export type Emoji = {
  id: string
  name: string
  native?: string
  unified?: string
  keywords: string[]
  shortcodes: string
  emoticons?: string[]
  src?: string
}
