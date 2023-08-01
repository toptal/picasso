import React from 'react'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import CodeBlockButton from './CodeBlockButton'

const PLUGIN_NAME = 'code-block'

export type Props = {
  testIds?: {
    button?: string
  }
}

const CodeBlockPlugin: RTEPlugin<Props> = ({ testIds = {} }: Props) => {
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
    nodes: [],
  },
}

export default CodeBlockPlugin
