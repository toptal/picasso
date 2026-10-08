import { LinkNode } from '@lexical/link'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import React from 'react'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import LinkPluginButton from './LinkPluginButton'
import LinkPluginModal from './LinkPluginModal'
import { useLinkPlugin } from './use-link-plugin'

const PLUGIN_NAME = 'link'

export type Props = {
  'data-testid'?: string
}

const LinkPlugin: RTEPlugin<Props> = ({ 'data-testid': testId }: Props) => {
  const { isOpen, editing, initialValues, open, close, submit, remove } =
    useLinkPlugin()

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <LinkPluginButton onClick={open} data-testid={testId} />
      </Toolbar>
      <LexicalLinkPlugin />
      <LinkPluginModal
        isOpen={isOpen}
        editing={editing}
        initialValues={initialValues}
        onClose={close}
        onSubmit={submit}
        onRemove={remove}
      />
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
