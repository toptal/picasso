import { LinkNode } from '@lexical/link'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import React from 'react'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import LinkPluginButton from './LinkPluginButton'

const PLUGIN_NAME = 'link'

export type Props = {
  'data-testid'?: string
}

const LinkPlugin: RTEPlugin<Props> = ({ 'data-testid': testId }: Props) => {
  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <LinkPluginButton data-testid={testId} />
      </Toolbar>
      <LexicalLinkPlugin />
    </>
  )
}

LinkPlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [LinkNode],
  },
}

export default LinkPlugin
