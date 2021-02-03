import React, { forwardRef, ReactNode, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Title content */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoModalTitle' })

export const ModalTitle = forwardRef<HTMLDivElement, Props>(function ModalTitle(
  props,
  ref
) {
  const { children, className, style, ...rest } = props

  const classes = useStyles()

  return (
    <div
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
    >
      <Typography variant='heading' size='medium'>
        {children}
      </Typography>
    </div>
  )
})

ModalTitle.displayName = 'ModalTitle'

export default ModalTitle
