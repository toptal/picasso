import React, { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { $createTextNode, TextNode } from 'lexical'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import CodeBlockButton from './CodeBlockButton'
import {
  $isCodeBlockNode,
  CodeBlockNode,
  $createCodeBlockTextNode,
  CodeBlockTextNode,
} from './nodes'

const PLUGIN_NAME = 'code-block'

export type Props = {
  testIds?: {
    button?: string
  }
}

const textNodeTransform = (node: TextNode): void => {
  // Since CodeNode has flat children structure we only need to check
  // if node's parent is a code node and run highlighting if so
  const parentNode = node.getParent()

  if ($isCodeBlockNode(parentNode)) {
    const text = node.getTextContent()

    const codeTextNode = $createCodeBlockTextNode(text)

    node.replace(codeTextNode)
  }
}

// when code block is converted to paragraph
const codeBlockTextNodeTransform = (node: CodeBlockTextNode): void => {
  const parentNode = node.getParent()

  if ($isCodeBlockNode(parentNode)) {
    return
  }

  node.replace($createTextNode(node.__text))
}

const CodeBlockPlugin: RTEPlugin<Props> = ({ testIds = {} }: Props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerNodeTransform(TextNode, textNodeTransform),
      editor.registerNodeTransform(
        CodeBlockTextNode,
        codeBlockTextNodeTransform
      )
    )
  }, [editor])

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <CodeBlockButton data-testid={testIds.button} />
      </Toolbar>
    </>
  )
}

CodeBlockPlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [CodeBlockNode, CodeBlockTextNode],
  },
}

export default CodeBlockPlugin
