import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, withClasses } from '@toptal/picasso-shared'

import Button from '../Button'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroupItem` */
  children: ReactNode
  first?: boolean
  last?: boolean
}

export const ButtonGroupItem = forwardRef<HTMLDivElement, Props>(
  function ButtonGroupItem(
    { children, classes, className, style, first, last, ...rest },
    ref
  ) {
    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(
          {
            [classes.first]: first && !last,
            [classes.middle]: !first && !last,
            [classes.last]: last && !first
          },
          className
        )}
        style={style}
      >
        {children}
      </div>
    )
  }
)

ButtonGroupItem.defaultProps = {
  classes: {},
  first: false,
  last: false
}

ButtonGroupItem.displayName = 'ButtonGroupItem'

export default withStyles(styles)(
  withClasses(classes => [
    [
      Button,
      {
        root: classes.button,
        active: classes.active
      }
    ]
  ])(ButtonGroupItem)
)
