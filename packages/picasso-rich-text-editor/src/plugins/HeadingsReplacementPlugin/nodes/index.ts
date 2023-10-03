import { $applyNodeReplacement } from 'lexical'
import type { HeadingTagType } from '@lexical/rich-text'

import { HeadingNode } from './HeadingNode'

const $createHeadingNode = (headingTag: HeadingTagType) => {
  return $applyNodeReplacement<HeadingNode>(new HeadingNode(headingTag))
}

const $isHeadingNode = (node: any) => {
  return node instanceof HeadingNode
}

export { HeadingNode, $createHeadingNode, $isHeadingNode }
