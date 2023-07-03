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

export type ASTChildType = ElementType | TextType | CustomEmojiType

export type ASTType = {
  type: 'root'
  children?: ASTChildType[]
}
