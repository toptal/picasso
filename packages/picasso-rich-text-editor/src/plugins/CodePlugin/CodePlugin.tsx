import React from 'react'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import CodeButton from './CodeButton'

const PLUGIN_NAME = 'code'

export type Props = {
  testIds?: {
    button?: string
  }
}

const CodePlugin: RTEPlugin<Props> = ({ testIds }) => {
  return (
    <Toolbar keyName={PLUGIN_NAME}>
      <CodeButton data-testid={testIds?.button} />
    </Toolbar>
  )
}

CodePlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
}

export default CodePlugin
