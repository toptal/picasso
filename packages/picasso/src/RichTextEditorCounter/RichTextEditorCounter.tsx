import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { Container } from '../Container'
import styles from './styles'

type Props = BaseProps & {
  counterMessage?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorCounter'
})

const RichTextEditorCounter = ({ counterMessage, className, style }: Props) => {
  const classes = useStyles()

  return (
    <Container className={cx(classes.counter, className)} style={style}>
      {counterMessage}
    </Container>
  )
}

RichTextEditorCounter.displayName = 'RichTextEditorCounter'

export default RichTextEditorCounter
