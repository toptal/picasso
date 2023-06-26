export type TextType = {
  type: 'text'
  value: string
}

export type ElementType = {
  type: 'element'
  tagName: 'p' | 'h3' | 'strong' | 'em' | 'ul' | 'ol' | 'li' | 'br' | 'a'
  properties: {}
  children: ASTChildType[]
}

export type ASTChildType = ElementType | TextType

export type ASTType = {
  type: 'root'
  children?: ASTChildType[]
}
