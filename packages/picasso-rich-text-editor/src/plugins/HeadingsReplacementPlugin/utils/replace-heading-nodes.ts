import type { HeadingNode } from '@lexical/rich-text'
import type { LexicalNode } from 'lexical'
import { $createParagraphNode, $createTextNode, $isTextNode } from 'lexical'

export const replaceHeadingNodes = (node: HeadingNode) => {
  if (node.getTag() === 'h3') {
    node.getChildren().forEach((node: LexicalNode) => {
      if ($isTextNode(node)) {
        node.setFormat(0)
      }
    })
  }

  if (node.getTag() !== 'h3') {
    const textNode = $createTextNode(node.getTextContent())

    textNode.setFormat('bold')

    const paragraphNode = $createParagraphNode()

    paragraphNode.append(textNode)
    node.replace(paragraphNode)
    paragraphNode.select()
  }
}
