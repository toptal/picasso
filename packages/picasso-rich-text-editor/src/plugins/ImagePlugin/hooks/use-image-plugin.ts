import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useModal } from '@toptal/picasso-utils'
import { useEffect } from 'react'
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical'
import { $wrapNodeInElement } from '@lexical/utils'

import { INSERT_IMAGE_COMMAND } from '../commands'
import type { ImageNodePayload } from '../nodes/ImageNode'
import { $createImageNode } from '../nodes/ImageNode'
import type { ImagePluginModalProps } from '../components/ImagePluginModal'
import type { UploadedImage } from '../types'

export const useImagePlugin = () => {
  const { isOpen: modalIsOpen, hideModal, showModal } = useModal()
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

  const onSubmit: ImagePluginModalProps['onSubmit'] = (
    image: UploadedImage,
    altText: string
  ) => {
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

  return {
    onSubmit,
    modalIsOpen,
    hideModal,
    showModal,
  }
}
