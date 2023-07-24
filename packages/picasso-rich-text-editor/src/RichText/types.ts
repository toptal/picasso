export type TextType = {
  type: 'text'
  value: string
}

export type ElementType = {
  type: 'element'
  tagName:
    | 'p'
    | 'h3'
    | 'strong'
    | 'em'
    | 'ul'
    | 'ol'
    | 'li'
    | 'br'
    | 'a'
    | 'img'
    | 'code'
  properties: {}
  children: ASTChildType[]
}

type CustomEmojiType = {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    'data-src': string
    'data-emoji-name': string
  }
  children: []
}

type CustomImageType = {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    alt?: string
  }
  children: []
}

export type ASTChildType =
  | ElementType
  | TextType
  | CustomEmojiType
  | CustomImageType

export type ASTType = {
  type: 'root'
  children?: ASTChildType[]
}
