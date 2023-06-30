import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core/styles'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import styles from './styles'

type Props = {
  hiddenInputId: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'HiddenInput',
})

const FocusOnLabelClickPlugin = ({ hiddenInputId }: Props) => {
  const classes = useStyles()
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
