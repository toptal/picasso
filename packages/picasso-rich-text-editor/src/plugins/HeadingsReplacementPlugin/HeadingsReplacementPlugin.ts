import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { HeadingNode } from '@lexical/rich-text'
import { useEffect } from 'react'

import { replaceHeadingNodes } from './utils'

const HeadingsReplacementPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerNodeTransform(HeadingNode, replaceHeadingNodes)
  }, [editor])

  return null
}

export default HeadingsReplacementPlugin
