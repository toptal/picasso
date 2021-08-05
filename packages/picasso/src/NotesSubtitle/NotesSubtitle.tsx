import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps {
}

const useStyles = makeStyles<Theme>(styles)

export const NotesSubtitle = forwardRef<HTMLElement, Props>(function NotesSubtitle(props, ref) {
  const classes = useStyles()

  return (
    <div>
      {props.children}
    </div>
  )
})

NotesSubtitle.defaultProps = {
}

NotesSubtitle.displayName = 'NotesSubtitle'

export default NotesSubtitle
