import React, {
  ReactNode,
  HTMLAttributes,
  forwardRef,
  ComponentType,
  useMemo
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  addClassesToChildren,
  Classes
} from '@toptal/picasso-shared'

import Button from '../Button'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonGroup'
})

const getChildrenClassesConfig = (
  classes: Classes
): [ComponentType, Classes][] => [
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

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup(props, ref) {
    const { children, className, style, ...rest } = props
    const classes = useStyles()
    const childrenWithClasses = useMemo(
      () =>
        addClassesToChildren({
          children,
          classes,
          config: getChildrenClassesConfig
        }),
      [children, classes]
    )

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
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
