import hastSanitize from 'hast-util-sanitize'
import hastFromDom from 'hast-util-from-dom'

import { ElementType, ASTType } from '../RichText/types'

const htmlToAst = (html: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const domHast = hastSanitize(hastFromDom(dom.body)) as ElementType

  const ast: ASTType = {
    type: 'root',
    children: domHast.children
  }

  return ast
}

export default htmlToAst
