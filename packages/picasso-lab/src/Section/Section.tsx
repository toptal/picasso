import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BaseProps, Container, Typography } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  /** Title of the Section */
  title?: ReactNode
  /** Subtitle of the Section */
  subtitle?: ReactNode
  /** Additional actions of the Section */
  actions?: ReactNode
  /** Main content of the Section */
  children?: ReactNode
  testIds?: {
    header?: string
    title?: string
    subtitle?: string
    actions?: string
  }
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSection'
})

export const Section = forwardRef<HTMLDivElement, Props>(function Section (
  props,
  ref
) {
  const {
    className,
    style,
    title,
    subtitle,
    actions,
    children,
    testIds,
    ...rest
  } = props
  const classes = useStyles()

  const renderTitle = () =>
    title ? (
      <Typography
        className={classes.title}
        data-testid={testIds?.title}
        variant='heading'
        size='medium'
      >
        {title}
      </Typography>
    ) : null

  const renderSubtitle = () =>
    subtitle ? (
      <Typography
        className={classes.subtitle}
        data-testid={testIds?.subtitle}
        size='medium'
        color='dark-grey'
      >
        {subtitle}
      </Typography>
    ) : null

  const renderActions = () =>
    actions ? (
      <Container data-testid={testIds?.actions} className={classes.actions}>
        {actions}
      </Container>
    ) : null

  const hasHeader = title || subtitle || actions

  return (
    <Container ref={ref} className={className} style={style} {...rest}>
      {hasHeader && (
        <Container data-testid={testIds?.header} className={classes.header}>
          {renderTitle()}
          {renderSubtitle()}
          {renderActions()}
        </Container>
      )}
      {children}
    </Container>
  )
})

Section.displayName = 'Section'

export default Section
