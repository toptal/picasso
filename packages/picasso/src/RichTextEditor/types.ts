import { ChangeHandler } from '../QuillEditor'

export type RichTextEditorChangeHandler = ChangeHandler

export type TextType = {
  type: 'text'
  value: string
}

export type ElementType = {
  type: 'element'
  tagName: 'p' | 'h3' | 'strong' | 'em' | 'ul' | 'ol' | 'li' | 'br'
  properties: {}
  children: ASTChildType[]
}

export type ASTChildType = ElementType | TextType

export type ASTType = {
  type: 'root'
  children: ASTChildType[]
}
