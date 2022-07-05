import React, { forwardRef } from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditorView',
})

type QuillEditorViewProps = BaseProps & {
  id?: string
}

const QuillEditorView = forwardRef<HTMLDivElement, QuillEditorViewProps>(
  function QuillEditorView({ id, 'data-testid': dataTestId }, ref) {
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

export default QuillEditorView
