import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { TOGGLE_LINK_COMMAND } from '@lexical/link'
import { Link16 } from '@toptal/picasso'
import React, { useCallback } from 'react'

import RichTextEditorButton from '../RichTextEditorButton'
import { sanitizeUrl, validateUrl } from './utils/url'

export type Props = {
  active?: boolean
  disabled?: boolean
  'data-testid'?: string
}

export const LexicalLinksPluginButton = ({
  active = true,
  disabled = false,
  'data-testid': testId,
}: Props) => {
  const [editor] = useLexicalComposerContext()

  const onLinkClick = useCallback(() => {
    if (active) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)

      return
    }

    const url = window.prompt('URL')

    if (url != null) {
      if (!validateUrl(url)) {
        window.alert('Not valid URL')

        return
      }

      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: sanitizeUrl(url) })
    }
  }, [editor, active])

  return (
    <RichTextEditorButton
      icon={<Link16 />}
      onClick={onLinkClick}
      active={active}
      disabled={disabled}
      data-testid={testId}
    />
  )
}
