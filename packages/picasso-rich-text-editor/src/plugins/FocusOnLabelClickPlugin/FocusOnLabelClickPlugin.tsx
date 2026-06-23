import React, { useCallback } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import styles from './styles'

type Props = {
  hiddenInputId: string
}

const FocusOnLabelClickPlugin = ({ hiddenInputId }: Props) => {
  const classes = styles
  const [editor] = useLexicalComposerContext()

  const handleFocus = useCallback(() => {
    editor.focus()
  }, [editor])

  const handleBlur = useCallback((event: React.FocusEvent) => {
    event.stopPropagation()
  }, [])

  return (
    <input
      type='text'
      id={hiddenInputId}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={classes.hiddenInput}
    />
  )
}

export default FocusOnLabelClickPlugin
