import React from 'react'
import { BaseProps, Container } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'

interface Props extends BaseProps {
  message?: string | 0
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorCounter'
})

const TextEditorCounter = ({ message, style }: Props) => {
  const classes = useStyles()

  return (
    <Container className={classes.counter} style={style}>
      {message}
    </Container>
  )
}

TextEditorCounter.displayName = 'TextEditorCounter'

export default TextEditorCounter
