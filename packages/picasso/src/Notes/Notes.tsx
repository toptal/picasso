import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'
import cx from 'classnames'

import NotesTitle from '../NotesTitle'
import NotesSubtitle from '../NotesSubtitle'
import NotesContent from '../NotesContent'
import styles from './styles'
import Container from '../Container'

export interface Props extends BaseProps {
  children: React.ReactNode
}

const useStyles = makeStyles<Theme>(styles)

export interface StaticProps {
  Title: typeof NotesTitle
  Subtitle: typeof NotesSubtitle
  Content: typeof NotesContent
}

export const Notes = forwardRef<HTMLDivElement, Props>(function Notes (
  { children, className, ...rest },
  ref
) {
  const classes = useStyles()

  return (
    <Container
      ref={ref}
      bottom='medium'
      className={cx(classes.root, className)}
      {...rest}
    >
      <Container className={classes.inner} flex justifyContent='space-between'>
        <Container>{children}</Container>
      </Container>
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Notes.defaultProps = {}

Notes.displayName = 'Notes'
Notes.Title = NotesTitle
Notes.Subtitle = NotesSubtitle
Notes.Content = NotesContent

export default Notes
