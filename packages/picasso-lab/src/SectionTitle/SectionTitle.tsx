import cx from 'classnames'
import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BaseProps, Container, Typography } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  children?: ReactNode
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSectionTitle'
})

export const SectionTitle = forwardRef<HTMLDivElement, Props>(function Section(
  props,
  ref
) {
  const { children, className, style, ...rest } = props
  const classes = useStyles()

  return (
    <Container
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      {...rest}
    >
      <Typography variant='heading' size='medium'>
        {children}
      </Typography>
    </Container>
  )
})

SectionTitle.displayName = 'SectionTitle'

export default SectionTitle
