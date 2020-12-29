import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  mergeClasses,
  useChildrenWithClasses
} from '@toptal/picasso-shared'

import Button from '../Button'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoButtonGroup'
})

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup(props, ref) {
    const {
      children,
      classes: externalClasses,
      className,
      style,
      ...rest
    } = props
    const classes = mergeClasses(useStyles(props), externalClasses)
    const childrenWithClasses = useChildrenWithClasses({
      children,
      classes,
      config: configClasses => [
        [
          Button,
          {
            root: configClasses.button,
            active: configClasses.active,
            focused: configClasses.focused,
            hovered: configClasses.hovered
          }
        ]
      ]
    })

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

ButtonGroup.defaultProps = {
  classes: {}
}

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
