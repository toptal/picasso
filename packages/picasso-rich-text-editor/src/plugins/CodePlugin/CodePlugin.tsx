import React from 'react'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import { CodeNode } from './nodes/CodeNode'
import CodeButton from './CodeButton'

const PLUGIN_NAME = 'code'

export type Props = {
  testIds?: {
    button?: string
  }
}

const EmojiPlugin: RTEPlugin<Props> = ({ testIds }) => {
  return (
    <Toolbar keyName={PLUGIN_NAME}>
      <CodeButton data-testid={testIds?.button} />
    </Toolbar>
  )
}

EmojiPlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [CodeNode],
  },
}

export default EmojiPlugin
