import cx from 'classnames'
import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CompoundedComponentWithRef } from '@toptal/shared'
import { BaseProps, Container } from '@toptal/picasso'

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

  const elements = React.Children.toArray(children)
  const onlyLastElement = elements.slice(-1)
  const elementsWithoutLast = elements.slice(0, -1)

  return (
    <Container
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      {...rest}
    >
      <Container className={classes.header}>{elementsWithoutLast}</Container>
      {onlyLastElement}
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Section.displayName = 'Section'

Section.Title = SectionTitle
Section.Subtitle = SectionSubtitle
Section.Actions = SectionActions
Section.Content = SectionContent

export default Section
