import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Action content (e.g. Buttons) */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoModalAction'
})

export const ModalActions = forwardRef<HTMLDivElement, Props>(
  function ModalActions(props, ref) {
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

ModalActions.displayName = 'ModalActions'

export default ModalActions
