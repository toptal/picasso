import { isHTMLElement } from '@lexical/utils'

const hasChildDOMNodeTag = (node: Node, tagName: string) => {
  for (const child of Array.from(node.childNodes)) {
    if (isHTMLElement(child) && child.tagName === tagName) {
      return true
    }

    hasChildDOMNodeTag(child, tagName)
  }

  return false
}

export default hasChildDOMNodeTag
