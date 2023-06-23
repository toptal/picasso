import type { HeadingNode } from '@lexical/rich-text'
import { $createParagraphNode, $createTextNode } from 'lexical'

export const replaceHeadingNodes = (node: HeadingNode) => {
  if (node.getTag() !== 'h3') {
    const textNode = $createTextNode(node.getTextContent())

    textNode.setFormat('bold')

    const paragraphNode = $createParagraphNode()

    paragraphNode.append(textNode)
    node.replace(paragraphNode)
    paragraphNode.select()
  }
}
