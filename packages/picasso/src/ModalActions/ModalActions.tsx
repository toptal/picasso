import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Action content (e.g. Buttons) */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoModalAction',
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
