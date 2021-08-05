import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps {}

const useStyles = makeStyles<Theme>(styles)

export const NotesContent = forwardRef<HTMLElement, Props>(
  function NotesContent(props, ref) {
    const classes = useStyles()

    return (
      <div>
        {props.children}
      </div>
    )
  }
)

NotesContent.defaultProps = {}

NotesContent.displayName = 'NotesContent'

export default NotesContent
