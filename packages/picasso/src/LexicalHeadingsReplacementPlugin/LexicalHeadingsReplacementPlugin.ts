import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HeadingNode } from '@lexical/rich-text'
import { useEffect } from 'react'

import { replaceHeadingNodes } from './utils'
import { TextNode } from 'lexical'
import { PicassoTextNode } from '../LexicalEditor/nodes'

const LexicalHeadingsReplacementPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerNodeTransform(HeadingNode, replaceHeadingNodes)
  }, [editor])

  // useEffect(() => {
  //   return editor.registerNodeTransform(TextNode, (node: TextNode) => {
  //     console.log('@@@ replacing')
  //     const newNode = PicassoTextNode.clone(node)
  //     node.replace(newNode)
  //   })
  // }, [editor])

  return null
}

export default LexicalHeadingsReplacementPlugin
