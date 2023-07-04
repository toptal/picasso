import React from 'react'
import { useModal } from '@toptal/picasso/utils'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import ImagePluginButton from './ImagePluginButton'
import ImagePluginModal from './ImagePluginModal'

const PLUGIN_NAME = 'image'

export type Props = {
  'data-testid'?: string
}

const LinkPlugin: RTEPlugin = ({ 'data-testid': testId }: Props) => {
  const { isOpen, hideModal, showModal } = useModal()

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <ImagePluginButton onClick={showModal} data-testid={testId} />
      </Toolbar>
      <ImagePluginModal isOpen={isOpen} onClose={hideModal} />
    </>
  )
}

LinkPlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [],
  },
}

export default LinkPlugin
