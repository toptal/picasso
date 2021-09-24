import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import ButtonGroupItem from '../ButtonGroupItem'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonGroup'
})

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup(props, ref) {
    const { children, className, style, ...rest } = props
    const classes = useStyles()

    return (
      <div
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

ButtonGroup.defaultProps = {}

ButtonGroup.displayName = 'ButtonGroup'

export default Object.assign(ButtonGroup, { Item: ButtonGroupItem })
