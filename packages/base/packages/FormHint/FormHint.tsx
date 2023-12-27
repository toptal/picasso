/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import Typography from '@toptal/picasso-typography'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  children: ReactNode
}

const useStyles = makeStyles<Theme>(styles, { name: 'FormHint' })

export const FormHint = forwardRef<HTMLDivElement, Props>(function FormHint(
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
      <Typography size='xxsmall'>{children}</Typography>
    </div>
  )
})

FormHint.defaultProps = {}

FormHint.displayName = 'FormHint'

export default FormHint
