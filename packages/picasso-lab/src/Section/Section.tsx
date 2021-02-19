import cx from 'classnames'
import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BaseProps, Container } from '@toptal/picasso'
import { CompoundedComponentWithRef } from '@toptal/picasso-shared'

import styles from './styles'
import SectionTitle from '../SectionTitle'
import SectionSubtitle from '../SectionSubtitle'
import SectionActions from '../SectionActions'
import SectionContent from '../SectionContent'

export interface StaticProps {
  Title: typeof SectionTitle
  Subtitle: typeof SectionSubtitle
  Actions: typeof SectionActions
  Content: typeof SectionContent
}

export interface Props extends BaseProps {
  children?: ReactNode
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSection'
})

export const Section = forwardRef<HTMLDivElement, Props>(function Section(
  props,
  ref
) {
  const { className, style, children, ...rest } = props
  const classes = useStyles()

  return (
    <Container
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      {...rest}
    >
      {children}
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Section.displayName = 'Section'

Section.Title = SectionTitle
Section.Subtitle = SectionSubtitle
Section.Actions = SectionActions
Section.Content = SectionContent

export default Section
