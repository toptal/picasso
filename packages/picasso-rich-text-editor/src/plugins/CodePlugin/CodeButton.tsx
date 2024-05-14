import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Code16 } from '@toptal/picasso-icons'
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import React, { useState } from 'react'

import { useRTEPluginContext, useRTEUpdate } from '../api'
import RichTextEditorButton from '../../RichTextEditorButton'

export type Props = {
  'data-testid'?: string
}

const CodeButton = ({ 'data-testid': testId }: Props) => {
  const [active, setActive] = useState(false)
  const [editor] = useLexicalComposerContext()
  const { disabled, focused, disabledFormatting } = useRTEPluginContext()

  useRTEUpdate(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      setActive(selection.hasFormat('code'))
    }
  })

  const handleCodeClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
  }

  const isDisabled = disabled || !focused || disabledFormatting

  return (
    <RichTextEditorButton
      icon={<Code16 />}
      onClick={handleCodeClick}
      active={isDisabled ? false : active}
      disabled={isDisabled}
      data-testid={testId}
    />
  )
}

export default CodeButton
