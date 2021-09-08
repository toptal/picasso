import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'
import cx from 'classnames'

import NoteTitle from '../NoteTitle'
import NoteSubtitle from '../NoteSubtitle'
import NoteContent from '../NoteContent'
import styles from './styles'

export interface Props extends BaseProps {
  children: React.ReactNode
}

const useStyles = makeStyles<Theme>(styles)

export interface StaticProps {
  Title: typeof NoteTitle
  Subtitle: typeof NoteSubtitle
  Content: typeof NoteContent
}

export const Note = forwardRef<HTMLDivElement, Props>(function Note(
  { children, className, ...rest },
  ref
) {
  const classes = useStyles()

  return (
    <div ref={ref} className={cx(classes.root, className)} {...rest}>
      {children}
    </div>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Note.defaultProps = {}

Note.displayName = 'Note'
Note.Title = NoteTitle
Note.Subtitle = NoteSubtitle
Note.Content = NoteContent

export default Note
