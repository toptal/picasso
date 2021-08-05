import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import NotesTitle from '../NotesTitle'
import NotesSubtitle from '../NotesSubtitle'
import NotesContent from '../NotesContent'
import styles from './styles'

export interface Props extends BaseProps {}

const useStyles = makeStyles<Theme>(styles)

export const Notes = forwardRef<HTMLElement, Props>(function Notes(props, ref) {
  const classes = useStyles()

  return <div>{props.children}</div>
})

Notes.defaultProps = {}

Notes.displayName = 'Notes'
Notes.Title = NotesTitle
Notes.Subtitle = NotesSubtitle
Notes.Content = NotesContent

export default Notes
