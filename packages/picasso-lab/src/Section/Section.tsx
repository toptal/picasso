import cx from 'classnames'
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
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSection'
})

export const Section = forwardRef<HTMLDivElement, Props>(function Section(
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
    ...rest
  } = props
  const classes = useStyles()

  return (
    <Container
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      {...rest}
    >
      <Container className={classes.header}>
        {title && (
          <Typography className={classes.title} variant='heading' size='medium'>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            className={classes.subtitle}
            size='medium'
            color='dark-grey'
          >
            {subtitle}
          </Typography>
        )}
        {actions && (
          <Container className={classes.actions}>{actions}</Container>
        )}
      </Container>
      {children}
    </Container>
  )
})

Section.displayName = 'Section'

export default Section
