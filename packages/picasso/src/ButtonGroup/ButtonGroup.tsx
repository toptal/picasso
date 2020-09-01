import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  withClasses,
  Classes,
  OverridableComponent
} from '@toptal/picasso-shared'

import Button from '../Button'
import Tooltip from '../Tooltip'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
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
    {
      componentType: Button,
      classes: {
        root: classes.button,
        active: classes.active
      } as Classes
    },
    {
      componentType: Tooltip as OverridableComponent,
      classes: {} as Classes,
      childrenClasses: {
        root: classes.button,
        active: classes.active
      }
    }
  ])(ButtonGroup)
)
