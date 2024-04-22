import {
  $isLinkNode,
  TOGGLE_LINK_COMMAND,
  $createLinkNode,
} from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Link16 } from '@toptal/picasso-icons'
import { $createTextNode, $getSelection, $isRangeSelection } from 'lexical'
import React, { useCallback, useState } from 'react'

import { getSelectedNode } from '../../LexicalEditor/utils/get-selected-node'
import { useRTEPluginContext, useRTEUpdate } from '../api'
import RichTextEditorButton from '../../RichTextEditorButton'
import { sanitizeUrl, validateUrl } from './utils/url'

export type Props = {
  'data-testid'?: string
}

const LinkPluginButton = ({ 'data-testid': testId }: Props) => {
  const [active, setActive] = useState(false)
  const [editor] = useLexicalComposerContext()
  const { disabled, focused, disabledFormatting } = useRTEPluginContext()

  useRTEUpdate(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()

      setActive(Boolean($isLinkNode(node) || $isLinkNode(parent)))
    }
  })

  const onLinkClick = useCallback(() => {
    if (active) {
      return editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }

    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        const isEmptySelection = selection.anchor.is(selection.focus)

        const url = window.prompt('URL')

        if (url != null) {
          if (!validateUrl(url)) {
            return window.alert('Not a valid URL')
          }
          const sanitizedUrl = sanitizeUrl(url)

          // When nothing is selected, we create a new Link node without dispatching
          // any commands to the original Lexical Link plugin
          if (isEmptySelection) {
            // The only way to reliably insert a link is to first create a dummy text node
            selection.insertNodes([$createTextNode(sanitizedUrl)])
            // Once created, node becomes selected
            const node = getSelectedNode(selection)
            const text = node.getTextContent()

            // Then we create a target Link node and replace the dummy text node with it
            const linkNode = $createLinkNode(sanitizedUrl, {
              rel: 'noreferrer',
            })

            linkNode.append($createTextNode(text))

            node.replace(linkNode)
          } else {
            // If we have a selection of any kind, pass the creation of the Link node to the plugin
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
              url: sanitizedUrl,
            })
          }
        }
      }
    })
  }, [editor, active])

  const isDisabled = disabled || !focused || disabledFormatting

  return (
    <RichTextEditorButton
      icon={<Link16 />}
      onClick={onLinkClick}
      active={isDisabled ? false : active}
      disabled={isDisabled}
      data-testid={testId}
    />
  )
}

export default LinkPluginButton
