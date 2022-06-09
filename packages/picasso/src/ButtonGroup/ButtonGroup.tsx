import React, {
  ReactNode,
  HTMLAttributes,
  forwardRef,
  useMemo,
  ElementType,
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  addClassesToChildren,
  Classes,
} from '@toptal/picasso-shared'

import Button from '../Button'
import ButtonGroupItem from '../ButtonGroupItem'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonGroup',
})

const getChildrenClassesConfig = (
  classes: Classes
): [ElementType, Classes][] => [
  [
    Button,
    {
      root: classes.button,
      active: classes.active,
      focused: classes.focused,
      hovered: classes.hovered,
    },
  ],
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
          config: getChildrenClassesConfig,
        }),
      [children, classes]
    )

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

export default Object.assign(ButtonGroup, { Item: ButtonGroupItem })
