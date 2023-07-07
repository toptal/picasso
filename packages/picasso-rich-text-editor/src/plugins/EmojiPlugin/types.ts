export type { CustomEmojiPayload } from './nodes/CustomEmojiNode'

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
  unified?: string
  keywords: string[]
  shortcodes: string
  emoticons?: string[]
} & ({ native: string } | { src: string })
