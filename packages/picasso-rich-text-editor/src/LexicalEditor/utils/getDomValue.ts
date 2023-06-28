import type { HastNode } from 'hast-util-to-dom/lib'
import toHtml from 'hast-util-to-html'

import type { ASTType } from '../../RichText'

export const getDomValue = (value: ASTType) => {
  const parser = new DOMParser()

  return parser.parseFromString(toHtml(value as HastNode), 'text/html')
}
