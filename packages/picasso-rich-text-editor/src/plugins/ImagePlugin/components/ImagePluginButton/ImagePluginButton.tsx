import { Image16 } from '@toptal/picasso'
import React from 'react'

import { useRTEPluginContext } from '../../../api'
import RichTextEditorButton from '../../../../RichTextEditorButton'

export type Props = {
  'data-testid'?: string
  onClick: () => void
}

const ImagePluginButton = ({ 'data-testid': testId, onClick }: Props) => {
  const { disabled, focused } = useRTEPluginContext()

  return (
    <RichTextEditorButton
      icon={<Image16 />}
      onClick={onClick}
      disabled={disabled || !focused}
      data-testid={testId}
    />
  )
}

export default ImagePluginButton
