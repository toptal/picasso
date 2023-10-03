import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { HeadingNode } from '@lexical/rich-text'

import { replaceHeadingNodes } from './utils'

const HeadingsReplacementPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerNodeTransform(HeadingNode, replaceHeadingNodes)
  }, [editor])

  return null
}

export default HeadingsReplacementPlugin
