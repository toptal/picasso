import hastSanitize, { Schema } from 'hast-util-sanitize'
import hastFromDom from 'hast-util-from-dom'

import { ASTType, ASTChildType } from '../RichText/types'

export const hastSanitizeSchema: Schema = {
  allowComments: false,
  allowDoctypes: false,
  ancestors: {
    li: ['ol', 'ul'],
  },
  attributes: {
    '*': [],
    a: ['href'],
  },
  tagNames: ['h3', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
  strip: ['script'],
}

const htmlToAst = (html: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const domHast = hastSanitize(hastFromDom(dom.body), hastSanitizeSchema) as
    | ASTType
    | ASTChildType

  const ast: ASTType = {
    type: 'root',
    children: domHast.type === 'root' ? domHast.children : [domHast],
  }

  return ast
}

export default htmlToAst
