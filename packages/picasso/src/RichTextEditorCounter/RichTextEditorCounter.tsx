import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { Container } from '../Container'
import styles from './styles'

type Props = BaseProps & {
  message?: string
  error?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorCounter',
})

const RichTextEditorCounter = ({
  message,
  error,
  className,
  style,
  'data-testid': dataTestId,
}: Props) => {
  const classes = useStyles()

  return (
    <Container
      className={cx(
        classes.counter,
        {
          [classes.counterError]: error,
        },
        className
      )}
      style={style}
      data-testid={dataTestId}
    >
      {message}
    </Container>
  )
}

RichTextEditorCounter.displayName = 'RichTextEditorCounter'

export default RichTextEditorCounter
