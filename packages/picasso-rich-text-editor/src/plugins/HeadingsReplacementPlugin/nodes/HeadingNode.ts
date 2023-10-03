import type { HeadingTagType } from '@lexical/rich-text'
import { HeadingNode as LexicalHeadingNode } from '@lexical/rich-text'
import type { NodeKey } from 'lexical/LexicalNode'

const ELEMENT_TYPE = 'picasso-heading'

/**
 * TODO: remove
 */

export class HeadingNode extends LexicalHeadingNode {
  static getType() {
    return ELEMENT_TYPE
  }

  constructor(tag: HeadingTagType, key?: NodeKey) {
    console.log('@@@ constructor', tag, key)
    super(tag, key)
  }

  // prevent formatting
  setFormat(): this {
    console.log('@@@ formatting', this)

    return this
  }
}
