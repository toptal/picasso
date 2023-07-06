import React, { useEffect } from 'react'
import { useModal } from '@toptal/picasso/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import { $wrapNodeInElement } from '@lexical/utils'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import { ImagePluginButton, ImagePluginModal } from './components'
import { INSERT_IMAGE_COMMAND } from './commands'
import type { ImageNodePayload } from './nodes/ImageNode'
import { $createImageNode, ImageNode } from './nodes/ImageNode'
import type { OnUploadCallback, UploadedImage } from './types'
import type { ImagePluginModalProps } from './components/ImagePluginModal'

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
  const { isOpen, hideModal, showModal } = useModal()
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (imagePayload: ImageNodePayload) => {
        const imageNode = $createImageNode(imagePayload)

        $insertNodes([imageNode])
        if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
          $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
        }

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  const onSubmit = (image: UploadedImage, altText: string) => {
    editor.update(() => {
      if (image.url) {
        const imageContainer = $createParagraphNode()
        const imageNode = $createImageNode({
          alt: altText,
          src: image.url,
        })

        imageContainer.append(imageNode)
        const selection = $getSelection()

        selection?.insertNodes([imageContainer])
      }
    })
  }

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <ImagePluginButton onClick={showModal} data-testid={testId} />
      </Toolbar>
      <ImagePluginModal
        accept={accept}
        maxSize={maxSize}
        isOpen={isOpen}
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
