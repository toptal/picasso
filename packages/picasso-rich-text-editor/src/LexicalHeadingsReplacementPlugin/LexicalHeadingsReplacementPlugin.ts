import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HeadingNode } from '@lexical/rich-text'
import { useEffect } from 'react'

import { replaceHeadingNodes } from './utils'

const LexicalHeadingsReplacementPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerNodeTransform(HeadingNode, replaceHeadingNodes)
  }, [editor])

  return null
}

export default LexicalHeadingsReplacementPlugin
