import hastSanitize, { Schema } from 'hast-util-sanitize'
import hastFromDom from 'hast-util-from-dom'

import { ElementType, ASTType } from '../RichText/types'

export const hastSanitizeSchema: Schema = {
  allowComments: false,
  allowDoctypes: false,
  ancestors: {
    li: ['ol', 'ul'],
  },
  attributes: {
    '*': [],
  },
  tagNames: ['h3', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
  strip: ['script'],
}

const htmlToAst = (html: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const domHast = hastSanitize(
    hastFromDom(dom.body),
    hastSanitizeSchema
  ) as ElementType

  const ast: ASTType = {
    type: 'root',
    children: domHast.children,
  }

  return ast
}

export default htmlToAst
