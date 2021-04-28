import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  addClassesToChildren,
  BaseProps,
  Classes
} from '@toptal/picasso-shared'
import cx from 'classnames'
import React, { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react'

import Button from '../Button'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonGroup'
})

const useChildrenWithClasses = (classes: Classes, children?: ReactNode) => {
  return useMemo(
    () =>
      addClassesToChildren({
        children,
        classes,
        config: () => [
          [
            Button,
            {
              root: classes.button,
              active: classes.active,
              focused: classes.focused,
              hovered: classes.hovered
            }
          ]
        ]
      }),
    [classes, children]
  )
}

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup (props, ref) {
    const { children, className, style, ...rest } = props
    const classes = useStyles()
    const childrenWithClasses = useChildrenWithClasses(classes, children)

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {childrenWithClasses}
      </div>
    )
  }
)

ButtonGroup.defaultProps = {}

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
