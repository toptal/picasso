import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'LexicalEditorView',
})

type LexicalEditorViewProps = BaseProps & {
  id?: string
}

const LexicalEditorView = forwardRef<HTMLDivElement, LexicalEditorViewProps>(
  function LexicalEditorView({ id, 'data-testid': dataTestId }, ref) {
    const classes = useStyles()

    return (
      <Typography
        as='div'
        variant='body'
        color='dark-grey'
        size='medium'
        className={classes.root}
        data-testid={dataTestId}
        id={id}
        ref={ref}
      />
    )
  }
)

export default LexicalEditorView
