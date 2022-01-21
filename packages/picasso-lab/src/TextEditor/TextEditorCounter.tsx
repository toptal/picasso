import React from 'react'
import { BaseProps, Container } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'

interface Props extends BaseProps {
  counterState?: any
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorCounter'
})

const TextEditorCounter = (props: Props) => {
  const { counterState, style } = props

  const [numOfCharsLeft] = counterState

  const classes = useStyles()

  return (
    <Container className={classes.counter} style={style}>
      {numOfCharsLeft}
    </Container>
  )
}

TextEditorCounter.displayName = 'TextEditorCounter'

export default TextEditorCounter
