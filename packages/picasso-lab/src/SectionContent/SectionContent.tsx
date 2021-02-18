import cx from 'classnames'
import React, { forwardRef, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { BaseProps, Container } from '@toptal/picasso'

import styles from './styles'

export interface Props extends BaseProps {
  children?: ReactNode
}

const useStyles = makeStyles(styles, {
  name: 'PicassoSectionContent'
})

export const SectionContent = forwardRef<HTMLDivElement, Props>(
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
        {children}
      </Container>
    )
  }
)

SectionContent.displayName = 'SectionContent'

export default SectionContent
