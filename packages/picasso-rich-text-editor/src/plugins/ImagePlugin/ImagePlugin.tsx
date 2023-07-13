import React from 'react'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import { ImagePluginButton, ImagePluginModal } from './components'
import { ImageNode } from './nodes/ImageNode'
import type { OnUploadCallback } from './types'
import type { ImagePluginModalProps } from './components/ImagePluginModal'
import { useImagePlugin } from './hooks'

const PLUGIN_NAME = 'image'

export type Props = {
  accept: ImagePluginModalProps['accept']
  maxSize: ImagePluginModalProps['maxSize']
  onUpload: OnUploadCallback
  'data-testid'?: string
}

const ImagePlugin: RTEPlugin = ({
  accept,
  maxSize,
  onUpload,
  'data-testid': testId,
}: Props) => {
  const { modalIsOpen, hideModal, showModal, onSubmit } = useImagePlugin()

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <ImagePluginButton onClick={showModal} data-testid={testId} />
      </Toolbar>
      <ImagePluginModal
        accept={accept}
        maxSize={maxSize}
        isOpen={modalIsOpen}
        onUpload={onUpload}
        onSubmit={onSubmit}
        onClose={hideModal}
      />
    </>
  )
}

ImagePlugin[RTEPluginMeta] = {
  name: PLUGIN_NAME,
  lexical: {
    nodes: [ImageNode],
  },
}

export default ImagePlugin
