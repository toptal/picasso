import React from 'react'
import { BaseProps, Container } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import styles from './styles'

interface TextEditorCounterProps extends BaseProps {
  message?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorCounter'
})

const TextEditorCounter = ({
  message,
  className,
  style
}: TextEditorCounterProps) => {
  const classes = useStyles()

  return (
    <Container className={cx(classes.counter, className)} style={style}>
      {message}
    </Container>
  )
}

TextEditorCounter.displayName = 'TextEditorCounter'

export default TextEditorCounter
