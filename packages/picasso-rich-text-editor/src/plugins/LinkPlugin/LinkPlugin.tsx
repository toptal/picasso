import { LinkNode } from '@lexical/link'
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import LinkPluginButton from './LinkPluginButton'
import LinkPluginModal from './LinkPluginModal'
import { useLinkPlugin } from './use-link-plugin'

const PLUGIN_NAME = 'link'

export interface Props extends BaseProps {
  /** Where a new link opens: `_blank` checks "Open in new tab" in the dialog */
  defaultTarget?: '_self' | '_blank'
}

const LinkPlugin: RTEPlugin<Props> = ({
  defaultTarget = '_self',
  className,
  style,
  'data-testid': testId,
}: Props) => {
  const { open, editing, initialValues, show, close, submit, remove } =
    useLinkPlugin({ defaultTarget })

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <LinkPluginButton
          onClick={show}
          className={className}
          style={style}
          data-testid={testId}
        />
      </Toolbar>
      <LexicalLinkPlugin />
      <LinkPluginModal
        open={open}
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
