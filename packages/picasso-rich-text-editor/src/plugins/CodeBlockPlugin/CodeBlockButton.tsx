import { CodeBlock16 } from '@toptal/picasso'
import React from 'react'

import { useRTEPluginContext } from '../api'
import RichTextEditorButton from '../../RichTextEditorButton'

export type Props = {
  'data-testid'?: string
}

const CodeBlockButton = ({ 'data-testid': testId }: Props) => {
  const { disabled, focused } = useRTEPluginContext()

  const handleClick = () => {}

  return (
    <RichTextEditorButton
      icon={<CodeBlock16 />}
      onClick={handleClick}
      active={false}
      disabled={disabled || !focused}
      data-testid={testId}
    />
  )
}

export default CodeBlockButton
