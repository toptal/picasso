import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@toptal/picasso/Typography'

import type { BaseProps } from '~/packages/shared/src'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, {
  name: 'LexicalEditorView',
})

type LexicalEditorViewProps = BaseProps & {
  id?: string
}

const EditorView = forwardRef<HTMLDivElement, LexicalEditorViewProps>(
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
        data-gramm_editor='false'
        data-enable-grammarly='false'
        data-gramm='false'
        id={id}
        ref={ref}
      />
    )
  }
)

export default EditorView
