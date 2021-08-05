import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps {}

const useStyles = makeStyles<Theme>(styles)

export const NotesTitle = forwardRef<HTMLElement, Props>(function NotesTitle(
  props,
  ref
) {
  const classes = useStyles()

  return <div>{props.children}</div>
})

NotesTitle.defaultProps = {}

NotesTitle.displayName = 'NotesTitle'

export default NotesTitle
