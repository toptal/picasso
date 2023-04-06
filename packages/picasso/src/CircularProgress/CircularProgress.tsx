import type { HTMLAttributes } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress as MUICircularProgress } from '@material-ui/core'
import type { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'determinate' | 'indeterminate' | 'static'

export interface Props
  extends StandardProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Size of the component */
  size?: number
  /** Current value for the `static` or `indeterminate` loaders */
  value?: number
  /** Variant of the `Loader` */
  variant?: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoCircularProgress',
})

const CircularProgress = (props: Props) => {
  const { className, style, size, value, variant, ...rest } = props
  const classes = useStyles(props)

  return (
    <MUICircularProgress
      {...rest}
      classes={classes}
      className={className}
      style={style}
      size={size}
      value={value}
      variant={variant}
    />
  )
}

CircularProgress.displayName = 'CircularProgress'

export default CircularProgress
