import { $isLinkNode } from '@lexical/link'
import { Link16 } from '@toptal/picasso-icons'
import { $getSelection, $isRangeSelection } from 'lexical'
import React, { useState } from 'react'

import { getSelectedNode } from '../../LexicalEditor/utils/get-selected-node'
import { useRTEPluginContext, useRTEUpdate } from '../api'
import RichTextEditorButton from '../../RichTextEditorButton'

export type Props = {
  'data-testid'?: string
  onClick: () => void
}

const LinkPluginButton = ({ 'data-testid': testId, onClick }: Props) => {
  const [active, setActive] = useState(false)
  const { disabled, focused, disabledFormatting } = useRTEPluginContext()

  useRTEUpdate(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()

      setActive(Boolean($isLinkNode(node) || $isLinkNode(parent)))
    }
  })

  const isDisabled = disabled || !focused || disabledFormatting

  return (
    <RichTextEditorButton
      icon={<Link16 />}
      onClick={onClick}
      active={isDisabled ? false : active}
      disabled={isDisabled}
      data-testid={testId}
    />
  )
}

export default LinkPluginButton
