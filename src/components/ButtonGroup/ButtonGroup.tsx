import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Button from '../Button'
import { StandardProps } from '../Picasso'
import { withClasses } from '../styles'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children?: ReactNode
}

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup({ children, classes, className, style, ...rest }, ref) {
    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

ButtonGroup.defaultProps = {
  classes: {}
}

ButtonGroup.displayName = 'ButtonGroup'

export default withStyles(styles)(
  withClasses(classes => [
    [
      Button,
      {
        root: classes.button,
        active: classes.active
      }
    ]
  ])(ButtonGroup)
)
