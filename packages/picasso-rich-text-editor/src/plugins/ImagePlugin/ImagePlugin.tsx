import React, { useEffect } from 'react'
import { useModal } from '@toptal/picasso/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import { $wrapNodeInElement } from '@lexical/utils'

import type { RTEPlugin } from '../api'
import { RTEPluginMeta, Toolbar } from '../api'
import ImagePluginButton from './ImagePluginButton'
import ImagePluginModal from './ImagePluginModal'
import { INSERT_IMAGE_COMMAND } from './commands'
import type { ImageNodePayload } from './nodes/ImageNode'
import { $createImageNode, ImageNode } from './nodes/ImageNode'

const PLUGIN_NAME = 'image'

export type Props = {
  'data-testid'?: string
}

const ImagePlugin: RTEPlugin = ({ 'data-testid': testId }: Props) => {
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

  return (
    <>
      <Toolbar keyName={PLUGIN_NAME}>
        <ImagePluginButton onClick={showModal} data-testid={testId} />
      </Toolbar>
      <ImagePluginModal isOpen={isOpen} onClose={hideModal} />
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
