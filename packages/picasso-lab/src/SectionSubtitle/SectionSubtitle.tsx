import cx from 'classnames'
import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BaseProps, Container, Typography } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  children?: ReactNode
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSectionSubtitle'
})

export const SectionSubtitle = forwardRef<HTMLDivElement, Props>(
  function Section(props, ref) {
    const { children, className, style, ...rest } = props
    const classes = useStyles()

    return (
      <Container
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
        {...rest}
      >
        <Typography size='medium' color='dark-grey'>
          {children}
        </Typography>
      </Container>
    )
  }
)

SectionSubtitle.displayName = 'SectionSubtitle'

export default SectionSubtitle
