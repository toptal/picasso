import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Link16 } from '@toptal/picasso'
import { $getSelection, $isRangeSelection } from 'lexical'
import React, { useCallback, useState } from 'react'

import { getSelectedNode } from '../../LexicalEditor/utils/getSelectedNode'
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

    const url = window.prompt('URL')

    if (url != null) {
      if (!validateUrl(url)) {
        return window.alert('Not valid URL')
      }

      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: sanitizeUrl(url) })
    }
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
