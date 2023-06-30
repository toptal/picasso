import { LinkNode } from '@lexical/link'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import React from 'react'

import type { RTEPlugin } from '../../RichTextEditor/plugins'
import { RTEPluginMeta, Toolbar } from '../../RichTextEditor/plugins'
import { LinkPluginButton } from './LinkPluginButton'

const PLUGIN_NAME = 'link'

export type Props = {
  'data-testid'?: string
}

export const LinkPlugin: RTEPlugin = ({ 'data-testid': testId }: Props) => {
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
