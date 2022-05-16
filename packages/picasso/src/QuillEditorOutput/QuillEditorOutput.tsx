import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

type QuillEditorOutputProps = BaseProps & {
  id?: string
}

const QuillEditorOutput = forwardRef<HTMLDivElement, QuillEditorOutputProps>(
  function QuillEditorOutput({ id, 'data-testid': dataTestId }, ref) {
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

export default QuillEditorOutput
