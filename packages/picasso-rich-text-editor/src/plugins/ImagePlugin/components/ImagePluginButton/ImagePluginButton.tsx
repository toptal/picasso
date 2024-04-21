import { Image16 } from '@toptal/picasso-icons'
import React from 'react'

import { useRTEPluginContext } from '../../../api'
import RichTextEditorButton from '../../../../RichTextEditorButton'

export type Props = {
  'data-testid'?: string
  onClick: () => void
}

const ImagePluginButton = ({ 'data-testid': testId, onClick }: Props) => {
  const { disabled, focused, disabledFormatting } = useRTEPluginContext()

  return (
    <RichTextEditorButton
      icon={<Image16 />}
      onClick={onClick}
      disabled={disabled || !focused || disabledFormatting}
      data-testid={testId}
    />
  )
}

export default ImagePluginButton
